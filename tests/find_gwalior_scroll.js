const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

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

  // Search scroll positions around 6800 - 8500 to find where line1 ("ROYAL") is visible on screen
  let foundY = 0;
  for (let y = 6500; y <= 9000; y += 200) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(100);
    const box = await page.evaluate(() => {
      const line2 = document.querySelector('.loc-intro-s_title_line.is-2');
      if (!line2) return null;
      const r = line2.getBoundingClientRect();
      return { left: r.left, right: r.right, isVisible: r.left < 1440 && r.right > 0 };
    });
    if (box && box.isVisible) {
      console.log(`At scroll y=${y}, GWALIOR rect: left=${box.left.toFixed(1)}, right=${box.right.toFixed(1)}`);
      if (box.left > 200 && box.left < 600) {
        foundY = y;
        break;
      }
    }
  }

  if (foundY > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), foundY);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(__dirname, 'gwalior_matched_screenshot.png') });
    console.log(`Captured gwalior_matched_screenshot.png at scroll y=${foundY}`);
  }

  await browser.close();
})();
