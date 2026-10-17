const { chromium } = require('playwright-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureReceptionBefore() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    try { sessionStorage.setItem('hasVisited', 'true'); } catch (e) {}
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(2000);

  // Scroll to loc-w section
  await page.evaluate(() => {
    const el = document.querySelector('.loc-w');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(1500);

  await page.screenshot({ path: path.join(__dirname, 'replica_screenshots', 'reception_before.png') });
  await browser.close();
  console.log('reception_before.png captured');
}

captureReceptionBefore().catch(console.error);
