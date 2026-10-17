const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  const outDir = path.join(__dirname, 'responsive_transparency');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const results = [];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
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

    // Test top of page
    await page.screenshot({ path: path.join(outDir, `${vp.name}_01_top.png`) });

    // Test scrolled position (e.g. 4000px or 6000px)
    await page.evaluate(() => window.scrollTo(0, 5000));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, `${vp.name}_02_scrolled.png`) });

    // Evaluate computed styles of header, logo, nav, scroll
    const styles = await page.evaluate(() => {
      const sels = ['.header-logo', '.header-nav', '.s-bar-w', '.s-down', '.btn-menu'];
      const res = {};
      sels.forEach(sel => {
        const el = document.querySelector(sel);
        if (!el) return;
        const cs = window.getComputedStyle(el);
        res[sel] = {
          display: cs.display,
          bg: cs.backgroundColor,
          color: cs.color,
          isTransparent: cs.backgroundColor === 'rgba(0, 0, 0, 0)' || cs.backgroundColor === 'transparent'
        };
      });
      return res;
    });

    results.push({ viewport: vp.name, styles });

    // Also test apartments page on this viewport
    await page.goto('http://127.0.0.1:3000/apartments', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const p = document.querySelector('[data-preloader]');
      if (p) p.style.display = 'none';
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, `${vp.name}_apartments.png`) });

    // Also test contact page on this viewport
    await page.goto('http://127.0.0.1:3000/contact', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const p = document.querySelector('[data-preloader]');
      if (p) p.style.display = 'none';
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, `${vp.name}_contact.png`) });

    await page.close();
  }

  console.log('Responsive verification results:\n', JSON.stringify(results, null, 2));

  await browser.close();
})();
