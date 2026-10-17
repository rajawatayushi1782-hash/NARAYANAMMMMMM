const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
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

  // Scroll to loc-info-w
  const locInfoRect = await page.evaluate(() => {
    const el = document.querySelector('.loc-info-w');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const parent = el.parentElement;
    return {
      elRect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
      parentRect: parent ? { x: parent.getBoundingClientRect().x, y: parent.getBoundingClientRect().y, w: parent.getBoundingClientRect().width, h: parent.getBoundingClientRect().height } : null,
      locInfoS: document.querySelector('.loc-info-s') ? document.querySelector('.loc-info-s').getBoundingClientRect() : null,
      flower: document.querySelector('.flower.loc-info') ? document.querySelector('.flower.loc-info').getBoundingClientRect() : null
    };
  });

  console.log('Loc info layout:', JSON.stringify(locInfoRect, null, 2));

  // Let's scroll to the section so it's in view
  await page.evaluate(() => {
    const el = document.querySelector('.loc-info-w');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'tests/loc_info_current.png' });
  console.log('Saved loc_info_current.png');

  await browser.close();
})();
