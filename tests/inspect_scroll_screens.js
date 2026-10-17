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

  const screenshotDir = path.join(__dirname, 'white_boxes_investigation');

  // Check / page with scroll
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const p = document.querySelector('[data-preloader]');
    if (p) p.style.display = 'none';
  });
  await page.waitForTimeout(1000);

  // Scroll down a few steps
  const scrollSteps = [0, 1000, 3000, 6000, 10000, 16000];
  for (let i = 0; i < scrollSteps.length; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollSteps[i]);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(screenshotDir, `home_scroll_${scrollSteps[i]}.png`) });
    console.log(`Saved home_scroll_${scrollSteps[i]}.png`);
  }

  // Check /apartments
  await page.goto('http://127.0.0.1:3000/apartments', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const p = document.querySelector('[data-preloader]');
    if (p) p.style.display = 'none';
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(screenshotDir, 'apartments_initial.png') });
  console.log('Saved apartments_initial.png');

  // Check /contact
  await page.goto('http://127.0.0.1:3000/contact', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const p = document.querySelector('[data-preloader]');
    if (p) p.style.display = 'none';
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(screenshotDir, 'contact_initial.png') });
  console.log('Saved contact_initial.png');

  await browser.close();
})();
