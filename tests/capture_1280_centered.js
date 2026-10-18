const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.addInitScript(() => {
    sessionStorage.setItem('hasVisited', 'true');
    localStorage.setItem('cookies', 'accepted');
  });

  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const p = document.querySelector('[data-preloader]');
    if (p) p.style.display = 'none';
  });
  await page.waitForTimeout(1000);

  // Search scroll positions to find where .loc-intro-s_title is centered in horizontal view (left around 300-500)
  let bestY = 0;
  let bestDist = Infinity;

  for (let y = 6000; y <= 8500; y += 50) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(10);
    const pos = await page.evaluate(() => {
      const title = document.querySelector('.loc-intro-s_title');
      const img = document.querySelector('.loc-intro-s_img');
      if (!title || !img) return null;
      const tr = title.getBoundingClientRect();
      const ir = img.getBoundingClientRect();
      return {
        titleLeft: tr.left,
        titleRight: tr.right,
        imgLeft: ir.left
      };
    });

    if (pos && pos.titleLeft > 100 && pos.titleRight < 1280) {
      // We want title positioned nicely around 300-400px
      const dist = Math.abs(pos.titleLeft - 380);
      if (dist < bestDist) {
        bestDist = dist;
        bestY = y;
      }
    }
  }

  console.log('1280x800 Best Scroll Y:', bestY);
  await page.evaluate((y) => window.scrollTo(0, y), bestY);
  await page.waitForTimeout(500);

  const shotPath = path.join(__dirname, 'final_validation_1280x800.png');
  await page.screenshot({ path: shotPath });
  console.log('Saved 1280x800 screenshot to:', shotPath);

  const metrics = await page.evaluate(() => {
    const l2 = document.querySelector('.loc-intro-s_title_line.is-2');
    const img = document.querySelector('.loc-intro-s_img');
    const cap = document.querySelector('.loc-intro-s_cap');
    const l1 = document.querySelector('.loc-intro-s_title_line.is-1');
    const l2r = l2.getBoundingClientRect();
    const ir = img.getBoundingClientRect();
    const cr = cap.getBoundingClientRect();
    const l1r = l1.getBoundingClientRect();
    return {
      gapToImg: ir.left - l2r.right,
      gapToCap: l1r.left - cr.right,
      l2Right: l2r.right,
      imgLeft: ir.left
    };
  });
  console.log('1280x800 metrics:', metrics);

  await browser.close();
})();
