const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    sessionStorage.setItem('hasVisited', 'true');
    localStorage.setItem('cookies', 'accepted');
  });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  
  // Wait until preloader is finished and hidden
  try {
    await page.waitForFunction(() => {
      const p = document.querySelector('[data-preloader]');
      return !p || getComputedStyle(p).display === 'none';
    }, { timeout: 10000 });
  } catch (e) {
    // If timeout, force hide preloader
    await page.evaluate(() => {
      const p = document.querySelector('[data-preloader]');
      if (p) p.style.display = 'none';
    });
  }
  await page.waitForTimeout(1000);

  const heroLogo = await page.$('.hero-s_logo');
  if (heroLogo) {
    await heroLogo.screenshot({ path: 'tests/exact_check_screenshots/01_hero_logo_refined.png' });
    console.log('Saved 01_hero_logo_refined.png');
  }

  await page.screenshot({ path: 'tests/exact_check_screenshots/01_hero_full_viewport.png' });
  console.log('Saved 01_hero_full_viewport.png');

  await browser.close();
})();
