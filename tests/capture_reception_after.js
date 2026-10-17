const { chromium } = require('playwright-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureReceptionAfter() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const consoleErrors = [];
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.addInitScript(() => {
    try { sessionStorage.setItem('hasVisited', 'true'); } catch (e) {}
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(2000);

  // Scroll to loc-w reception section
  await page.evaluate(() => {
    const el = document.querySelector('.loc-w');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(2000);

  // Capture desktop
  await page.screenshot({ path: path.join(__dirname, 'replica_screenshots', 'reception_after_desktop.png') });
  console.log('reception_after_desktop.png captured');

  // Capture mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    const el = document.querySelector('.loc-w');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, 'replica_screenshots', 'reception_after_mobile.png') });
  console.log('reception_after_mobile.png captured');

  console.log('Total console errors:', consoleErrors.length);
  if (consoleErrors.length > 0) console.log('Errors:', consoleErrors);

  await browser.close();
}

captureReceptionAfter().catch(console.error);
