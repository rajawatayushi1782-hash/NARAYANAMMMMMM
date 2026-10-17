const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SHOTS_DIR = path.join(__dirname, 'brand_screenshots');
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });

async function capture() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Fast preloader
  await page.addInitScript(() => {
    try { sessionStorage.setItem('hasVisited', 'true'); } catch (e) {}
  });

  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 1. Hero
  await page.screenshot({ path: path.join(SHOTS_DIR, '01_hero_desktop.png') });
  console.log('Captured: 01_hero_desktop.png');

  // Scroll to section 2 (About Narayanam)
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SHOTS_DIR, '02_about_desktop.png') });
  console.log('Captured: 02_about_desktop.png');

  // Scroll to section 3 (Residences / Rooms)
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3.5));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SHOTS_DIR, '03_rooms_desktop.png') });
  console.log('Captured: 03_rooms_desktop.png');

  // Scroll to section 4 (Amenities / Features)
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 5.5));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SHOTS_DIR, '04_amenities_desktop.png') });
  console.log('Captured: 04_amenities_desktop.png');

  // Scroll to section 5 (Banquet / Dining)
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 7.5));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SHOTS_DIR, '05_banquet_dining_desktop.png') });
  console.log('Captured: 05_banquet_dining_desktop.png');

  // Scroll to bottom (Footer)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SHOTS_DIR, '06_footer_desktop.png') });
  console.log('Captured: 06_footer_desktop.png');

  // Tablet View
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SHOTS_DIR, '07_hero_tablet.png') });
  console.log('Captured: 07_hero_tablet.png');

  // Mobile View
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SHOTS_DIR, '08_hero_mobile.png') });
  console.log('Captured: 08_hero_mobile.png');

  // Apartments Catalogue
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/apartments', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SHOTS_DIR, '09_apartments_catalogue.png') });
  console.log('Captured: 09_apartments_catalogue.png');

  // Room Detail 011
  await page.goto('http://localhost:3000/apartments/011', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SHOTS_DIR, '10_room_detail_011.png') });
  console.log('Captured: 10_room_detail_011.png');

  // Contact Page
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SHOTS_DIR, '11_contact_desktop.png') });
  console.log('Captured: 11_contact_desktop.png');

  await browser.close();
  console.log('All brand showcase screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error capturing brand showcase:', err);
  process.exit(1);
});
