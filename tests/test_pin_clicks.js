const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testClicks() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Test Home Page
  console.log('--- Testing Home Page Hotspots ---');
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const pins = await page.$$('.pins-cms_list_item, [data-modal-tip-btn]');
  console.log(`Found ${pins.length} pins on home`);
  for (let i = 0; i < pins.length; i++) {
    const attr = await pins[i].getAttribute('data-modal-tip-btn');
    console.log(`Clicking pin ${i+1}: ${attr}`);
    await pins[i].click({ force: true });
    await page.waitForTimeout(1000);
    const openModals = await page.evaluate(() => {
      const visible = [];
      document.querySelectorAll('.modal, .floating-tip, [data-modal-tip]').forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
          visible.push({
            tag: el.tagName,
            cls: el.className,
            text: el.innerText.trim().slice(0, 80),
            hasImg: el.querySelectorAll('img').length,
            imgs: Array.from(el.querySelectorAll('img')).map(img => ({
              src: img.src,
              naturalWidth: img.naturalWidth,
              display: window.getComputedStyle(img).display
            }))
          });
        }
      });
      return visible;
    });
    console.log('Visible modals/cards after click:', JSON.stringify(openModals, null, 2));
  }

  // 2. Test Mobile Home Page
  console.log('\n--- Testing Mobile Home Page Hotspots ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const mobilePins = await page.$$('.pins-cms_list_item, [data-modal-tip-btn]');
  console.log(`Found ${mobilePins.length} pins on mobile home`);
  for (let i = 0; i < mobilePins.length; i++) {
    const attr = await mobilePins[i].getAttribute('data-modal-tip-btn');
    console.log(`Clicking mobile pin ${i+1}: ${attr}`);
    await mobilePins[i].click({ force: true });
    await page.waitForTimeout(1000);
    const openModals = await page.evaluate(() => {
      const visible = [];
      document.querySelectorAll('.modal, .floating-tip, [data-modal-tip]').forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
          visible.push({
            tag: el.tagName,
            cls: el.className,
            text: el.innerText.trim().slice(0, 80),
            hasImg: el.querySelectorAll('img').length,
            imgs: Array.from(el.querySelectorAll('img')).map(img => ({
              src: img.src,
              naturalWidth: img.naturalWidth
            }))
          });
        }
      });
      return visible;
    });
    console.log('Visible modals on mobile after click:', JSON.stringify(openModals, null, 2));
  }

  // 3. Test Room 011 Page
  console.log('\n--- Testing Room 011 Hotspots ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/apartments/011', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const roomPins = await page.$$('.lot-media-item, [hover-pin-trigger]');
  console.log(`Found ${roomPins.length} room media items on /apartments/011`);
  for (let i = 0; i < roomPins.length; i++) {
    console.log(`Clicking room media item ${i+1}`);
    await roomPins[i].click({ force: true });
    await page.waitForTimeout(1000);
    const state = await page.evaluate(() => {
      const lb = document.querySelector('[data-lightbox-modal]');
      if (!lb) return null;
      const style = window.getComputedStyle(lb);
      const img = lb.querySelector('img');
      return {
        display: style.display,
        opacity: style.opacity,
        imgSrc: img ? img.src : null,
        naturalWidth: img ? img.naturalWidth : null,
        naturalHeight: img ? img.naturalHeight : null,
        imgDisplay: img ? window.getComputedStyle(img).display : null,
        imgVisibility: img ? window.getComputedStyle(img).visibility : null
      };
    });
    console.log('Lightbox state after click:', state);
  }

  await browser.close();
}

testClicks().catch(e => { console.error(e); process.exit(1); });
