const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectImg() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    try { sessionStorage.setItem('hasVisited', 'true'); } catch (e) {}
  });

  await page.goto('http://localhost:3000/apartments', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const info = await page.evaluate(() => {
    const el = document.elementFromPoint(700, 450);
    const bounds = el ? el.getBoundingClientRect() : null;
    return {
      src: el ? el.src : null,
      naturalWidth: el ? el.naturalWidth : null,
      naturalHeight: el ? el.naturalHeight : null,
      bounds: bounds ? { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height } : null,
      bodyScrollHeight: document.body.scrollHeight,
      windowScrollY: window.scrollY
    };
  });

  console.log('Image info:', JSON.stringify(info, null, 2));
  await browser.close();
}

inspectImg().catch(console.error);
