const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SHOTS_DIR = path.join(__dirname, 'hotspot_debug_screenshots');
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });

async function debugHotspots() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.addInitScript(() => {
    try { sessionStorage.setItem('hasVisited', 'true'); } catch (e) {}
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  
  await page.waitForFunction(() => {
    const p = document.querySelector('[data-preloader]');
    return !p || window.getComputedStyle(p).display === 'none' || window.getComputedStyle(p).opacity === '0';
  }, { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(1500);

  // Take screenshot of hero section with pins
  await page.screenshot({ path: path.join(SHOTS_DIR, '01_hero_with_pins.png') });
  console.log('Saved 01_hero_with_pins.png');

  const pinIds = ['crafted-to-endure', 'light-flow', 'your-private-sanctuary'];
  for (const id of pinIds) {
    const pin = await page.$(`[data-pin="${id}"]`);
    if (pin) {
      console.log(`Hovering over pin: ${id}`);
      const box = await pin.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(SHOTS_DIR, `02_hover_${id}.png`) });
        console.log(`Saved 02_hover_${id}.png`);

        // Click pin
        console.log(`Clicking pin: ${id}`);
        await pin.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(SHOTS_DIR, `03_click_${id}.png`) });
        console.log(`Saved 03_click_${id}.png`);
      }
    }
  }

  await browser.close();
}

debugHotspots().catch(err => {
  console.error(err);
  process.exit(1);
});
