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

  const outDir = path.join(__dirname, 'transparency_verification');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Home Page Verification across multiple scroll positions
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const p = document.querySelector('[data-preloader]');
    if (p) p.style.display = 'none';
  });
  await page.waitForTimeout(1000);

  const scrollPositions = [0, 3000, 6000, 8000, 12000];
  const inspectionResults = [];

  for (const y of scrollPositions) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(600);

    const check = await page.evaluate((pos) => {
      const items = ['.header-logo', '.header-nav', '.s-bar-w', '.s-down'];
      const details = {};
      items.forEach(sel => {
        const el = document.querySelector(sel);
        if (!el) return;
        const cs = window.getComputedStyle(el);
        details[sel] = {
          bg: cs.backgroundColor,
          color: cs.color,
          isTransparent: cs.backgroundColor === 'rgba(0, 0, 0, 0)' || cs.backgroundColor === 'transparent'
        };
      });
      return { scrollY: pos, details };
    }, y);

    inspectionResults.push(check);
    await page.screenshot({ path: path.join(outDir, `home_scroll_${y}.png`) });
    console.log(`Captured home_scroll_${y}.png`);
  }

  console.log('Home Inspection Results:');
  console.log(JSON.stringify(inspectionResults, null, 2));

  // 2. Apartments page
  await page.goto('http://127.0.0.1:3000/apartments', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const p = document.querySelector('[data-preloader]');
    if (p) p.style.display = 'none';
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'apartments_top.png') });
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'apartments_scroll_3000.png') });
  console.log('Captured apartments screenshots');

  // 3. Contact page
  await page.goto('http://127.0.0.1:3000/contact', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const p = document.querySelector('[data-preloader]');
    if (p) p.style.display = 'none';
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'contact_top.png') });
  console.log('Captured contact screenshot');

  await browser.close();
})();
