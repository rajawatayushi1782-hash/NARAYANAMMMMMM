const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SHOTS_DIR = path.join(__dirname, 'hotspot_verification_screenshots');
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });

async function runHotspotValidation() {
  console.log('Starting Playwright Hotspot Interactive Cards Validation...\n');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    failedRequests: [],
    consoleErrors: [],
    desktopHoverPassed: [],
    desktopClickPassed: [],
    mobileClickPassed: []
  };

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.addInitScript(() => {
    try {
      sessionStorage.setItem('hasVisited', 'true');
      localStorage.setItem('cookies', 'accepted');
    } catch (e) {}
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push(msg.text());
      console.error('[Browser Error]:', msg.text());
    }
  });

  page.on('response', res => {
    if (res.status() >= 400) {
      results.failedRequests.push({ url: res.url(), status: res.status() });
      console.error(`[Failed Request]: ${res.status()} ${res.url()}`);
    }
  });

  console.log('Navigating to http://127.0.0.1:3000/ ...');
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });

  await page.waitForFunction(() => {
    const p = document.querySelector('[data-preloader]');
    return !p || window.getComputedStyle(p).display === 'none' || window.getComputedStyle(p).opacity === '0';
  }, { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(1500);

  // Take screenshot of initial hero with hotspots
  await page.screenshot({ path: path.join(SHOTS_DIR, '01_desktop_hero_hotspots.png') });
  console.log('Captured 01_desktop_hero_hotspots.png');

  const hotspots = [
    {
      id: 'crafted-to-endure',
      expectedTitle: 'Handcrafted Grandeur',
      expectedImgSrc: '/assets/narayanam/facilities/hotel-front-view.jpg',
      type: 'Amenities / Architecture'
    },
    {
      id: 'light-flow',
      expectedTitle: 'Naivedyam Pure Veg',
      expectedImgSrc: '/assets/narayanam/dining/naivedyam-restaurant.jpg',
      type: 'Dining'
    },
    {
      id: 'your-private-sanctuary',
      expectedTitle: 'Royal Suites & Rooms',
      expectedImgSrc: '/assets/narayanam/rooms/royal-suite.jpg',
      type: 'Room'
    }
  ];

  // ==========================================
  // PART 1: TEST DESKTOP HOVER
  // ==========================================
  console.log('\n--- PART 1: Testing Desktop Hover on Hotspots ---');
  for (const hs of hotspots) {
    const pin = await page.$(`[data-pin="${hs.id}"]`);
    if (!pin) {
      throw new Error(`Pin [data-pin="${hs.id}"] not found on page!`);
    }

    const box = await pin.boundingBox();
    console.log(`Hovering over pin [${hs.id}] at (${Math.round(box.x)}, ${Math.round(box.y)}) ...`);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(800);

    const tipData = await page.evaluate((tipId) => {
      const tip = document.querySelector(`[floating-tip="${tipId}"]`);
      if (!tip) return null;
      const img = tip.querySelector('.floating-tip-card_img');
      const heading = tip.querySelector('.h5');
      const desc = tip.querySelector('.p1');
      return {
        isActive: tip.classList.contains('is-active'),
        heading: heading ? heading.innerText.trim() : null,
        desc: desc ? desc.innerText.trim() : null,
        imgSrc: img ? img.getAttribute('src') : null,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        imgVisible: img ? (window.getComputedStyle(img).display !== 'none' && window.getComputedStyle(img).visibility !== 'hidden') : false
      };
    }, hs.id);

    console.log(`[Hover Result ${hs.id}]:`, tipData);
    if (!tipData || !tipData.imgSrc || tipData.naturalWidth === 0) {
      throw new Error(`Hover card for [${hs.id}] failed! Image is blank or missing.`);
    }

    await page.screenshot({ path: path.join(SHOTS_DIR, `02_desktop_hover_${hs.id}.png`) });
    results.desktopHoverPassed.push(hs.id);
  }

  // ==========================================
  // PART 2: TEST DESKTOP CLICK & MODAL OPEN/CLOSE
  // ==========================================
  console.log('\n--- PART 2: Testing Desktop Click & Modal Cards ---');
  // Move mouse away to dismiss hover tooltip
  await page.mouse.move(10, 10);
  await page.waitForTimeout(500);

  for (const hs of hotspots) {
    const pin = await page.$(`[data-pin="${hs.id}"]`);
    console.log(`Clicking hotspot [${hs.id}] (${hs.type}) ...`);
    await pin.click();
    await page.waitForTimeout(1000);

    const modalData = await page.evaluate((tipId) => {
      const modal = document.querySelector(`[data-modal-tip="${tipId}"]`);
      if (!modal) return null;
      const card = modal.querySelector('.modal-tip-card');
      const img = modal.querySelector('.floating-tip-card_img');
      const heading = modal.querySelector('.h5');
      const desc = modal.querySelector('.p1');
      const closeBtn = modal.querySelector('.modal-tip-close_btn');
      const modalStyle = window.getComputedStyle(modal);
      return {
        display: modalStyle.display,
        opacity: modalStyle.opacity,
        heading: heading ? heading.innerText.trim() : null,
        desc: desc ? desc.innerText.trim() : null,
        imgSrc: img ? img.getAttribute('src') : null,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        hasCloseBtn: !!closeBtn
      };
    }, hs.id);

    console.log(`[Click Modal Result ${hs.id}]:`, modalData);
    if (!modalData || modalData.display === 'none' || modalData.naturalWidth === 0) {
      throw new Error(`Modal card for [${hs.id}] failed to display or image is blank!`);
    }

    await page.screenshot({ path: path.join(SHOTS_DIR, `03_desktop_modal_${hs.id}.png`) });

    // Test close button
    const closeBtn = await page.$(`[data-modal-tip="${hs.id}"] .modal-tip-close_btn`);
    if (!closeBtn) throw new Error(`Close button missing for modal [${hs.id}]`);
    console.log(`Clicking close button for [${hs.id}] ...`);
    await closeBtn.click();
    await page.waitForTimeout(1000);

    const closedState = await page.evaluate((tipId) => {
      const modal = document.querySelector(`[data-modal-tip="${tipId}"]`);
      return modal ? modal.style.display : null;
    }, hs.id);
    console.log(`[Modal ${hs.id} closed display]:`, closedState);

    results.desktopClickPassed.push(hs.id);
  }

  // ==========================================
  // PART 3: TEST MOBILE VIEWPORT (390 x 844)
  // ==========================================
  console.log('\n--- PART 3: Testing Mobile Layout & Hotspot Clicks (390x844) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: path.join(SHOTS_DIR, '04_mobile_hero_hotspots.png') });

  for (const hs of hotspots) {
    const pin = await page.$(`[data-pin="${hs.id}"]`);
    if (!pin) throw new Error(`Mobile pin [data-pin="${hs.id}"] not found!`);
    const isVisible = await pin.isVisible();
    console.log(`Mobile Pin [${hs.id}] isVisible:`, isVisible);

    console.log(`Clicking mobile pin [${hs.id}] ...`);
    await pin.click({ force: true });
    await page.waitForTimeout(1000);

    const mobileModalData = await page.evaluate((tipId) => {
      const modal = document.querySelector(`[data-modal-tip="${tipId}"]`);
      if (!modal) return null;
      const img = modal.querySelector('.floating-tip-card_img');
      const heading = modal.querySelector('.h5');
      return {
        display: modal.style.display,
        heading: heading ? heading.innerText.trim() : null,
        imgSrc: img ? img.getAttribute('src') : null,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0
      };
    }, hs.id);

    console.log(`[Mobile Modal ${hs.id}]:`, mobileModalData);
    if (!mobileModalData || mobileModalData.naturalWidth === 0) {
      throw new Error(`Mobile modal [${hs.id}] failed to show valid image!`);
    }

    await page.screenshot({ path: path.join(SHOTS_DIR, `05_mobile_modal_${hs.id}.png`) });

    const closeBtn = await page.$(`[data-modal-tip="${hs.id}"] .modal-tip-close_btn`);
    await closeBtn.click({ force: true });
    await page.waitForTimeout(800);

    results.mobileClickPassed.push(hs.id);
  }

  console.log('\n==========================================');
  console.log('HOTSPOT VALIDATION SUMMARY:');
  console.log('- Desktop Hover Passed:', results.desktopHoverPassed);
  console.log('- Desktop Click Passed:', results.desktopClickPassed);
  console.log('- Mobile Click Passed:', results.mobileClickPassed);
  console.log('- Failed HTTP Requests:', results.failedRequests.length);
  console.log('- Console Errors:', results.consoleErrors.length);
  console.log('==========================================\n');

  await browser.close();
}

runHotspotValidation().catch(err => {
  console.error('\nVALIDATION FAILED:', err);
  process.exit(1);
});
