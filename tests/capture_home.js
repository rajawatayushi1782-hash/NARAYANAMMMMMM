const { chromium } = require('playwright-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    try { sessionStorage.setItem('hasVisited', 'true'); } catch (e) {}
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(__dirname, 'replica_screenshots', 'home_desktop.png') });
  await browser.close();
  console.log('home_desktop.png refreshed');
}

capture().catch(console.error);
