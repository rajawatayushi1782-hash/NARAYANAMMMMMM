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

  // Check across all scroll positions from 0 to 12000 in steps of 1000
  for (let y = 0; y <= 10000; y += 2000) {
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await page.waitForTimeout(500);

    const res = await page.evaluate((scrollPos) => {
      const items = ['.header-logo', '.header-nav', '.s-bar-w', '.s-down'];
      const data = {};
      items.forEach(sel => {
        const el = document.querySelector(sel);
        if (!el) return;
        const cs = window.getComputedStyle(el);
        const parent = el.parentElement;
        const parentCs = parent ? window.getComputedStyle(parent) : null;
        data[sel] = {
          scrollPos,
          class: el.className,
          bg: cs.backgroundColor,
          parentClass: parent ? parent.className : '',
          parentBg: parentCs ? parentCs.backgroundColor : ''
        };
      });
      return data;
    }, y);

    console.log(`Scroll ${y}:`, JSON.stringify(res, null, 2));
  }

  await browser.close();
})();
