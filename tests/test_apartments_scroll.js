const { chromium } = require('playwright-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testApartments() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    try { sessionStorage.setItem('hasVisited', 'true'); } catch (e) {}
  });

  await page.goto('http://localhost:3000/apartments', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);

  // Take screenshot at top
  await page.screenshot({ path: path.join(__dirname, 'replica_screenshots', 'apartments_top.png') });

  // Scroll down 400px
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, 'replica_screenshots', 'apartments_scrolled_500.png') });

  // Scroll down 1200px
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, 'replica_screenshots', 'apartments_scrolled_1500.png') });

  await browser.close();
  console.log('Apartments screenshots captured.');
}

testApartments().catch(console.error);
