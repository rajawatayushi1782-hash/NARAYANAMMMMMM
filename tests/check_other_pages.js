const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.addInitScript(() => {
    sessionStorage.setItem('hasVisited', 'true');
    localStorage.setItem('cookies', 'accepted');
  });

  for (const url of ['http://127.0.0.1:3000/apartments', 'http://127.0.0.1:3000/contact']) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const p = document.querySelector('[data-preloader]');
      if (p) p.style.display = 'none';
    });
    await page.waitForTimeout(1000);

    const info = await page.evaluate((u) => {
      const els = document.querySelectorAll('[data-theme], .header-logo, .header-nav, .header-cramps, .s-bar-w, .s-down');
      return Array.from(els).map(el => ({
        url: u,
        tag: el.tagName,
        className: el.className,
        bg: window.getComputedStyle(el).backgroundColor
      }));
    }, url);

    console.log(`=== ${url} ===`, JSON.stringify(info, null, 2));
  }

  await browser.close();
})();
