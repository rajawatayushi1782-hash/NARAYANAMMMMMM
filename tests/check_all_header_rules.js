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

  // Check state at scroll = 0 vs scroll = 6000
  for (const scrollY of [0, 6000]) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(800);

    const info = await page.evaluate((y) => {
      const selectors = ['.header-logo', '.header-nav', '.s-bar-w', '.s-down'];
      return selectors.map(sel => {
        const el = document.querySelector(sel);
        if (!el) return { sel, found: false };
        const cs = window.getComputedStyle(el);
        const childrenWithBg = Array.from(el.querySelectorAll('*')).filter(c => {
          const ccs = window.getComputedStyle(c);
          return ccs.backgroundColor !== 'rgba(0, 0, 0, 0)' && ccs.backgroundColor !== 'transparent';
        }).map(c => ({
          tag: c.tagName,
          class: c.className,
          bg: window.getComputedStyle(c).backgroundColor
        }));

        return {
          scrollY: y,
          sel,
          classes: el.className,
          bg: cs.backgroundColor,
          color: cs.color,
          childrenWithBg
        };
      });
    }, scrollY);

    console.log(`=== SCROLL ${scrollY} ===`);
    console.log(JSON.stringify(info, null, 2));
  }

  await browser.close();
})();
