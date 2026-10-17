const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.addInitScript(() => {
    sessionStorage.setItem('hasVisited', 'true');
    localStorage.setItem('cookies', 'accepted');
  });

  await page.goto('http://127.0.0.1:3000/apartments/011', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const p = document.querySelector('[data-preloader]');
    if (p) p.style.display = 'none';
  });
  await page.waitForTimeout(1000);

  const outDir = path.join(__dirname, 'responsive_transparency');
  await page.screenshot({ path: path.join(outDir, 'room_011_top.png') });

  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'room_011_scrolled.png') });

  const styles = await page.evaluate(() => {
    const sels = ['.header-logo', '.header-nav', '.header-cramps'];
    const res = {};
    sels.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      const cs = window.getComputedStyle(el);
      res[sel] = {
        bg: cs.backgroundColor,
        color: cs.color,
        isTransparent: cs.backgroundColor === 'rgba(0, 0, 0, 0)' || cs.backgroundColor === 'transparent'
      };
    });
    return res;
  });

  console.log('Room 011 styles:', JSON.stringify(styles, null, 2));
  await browser.close();
})();
