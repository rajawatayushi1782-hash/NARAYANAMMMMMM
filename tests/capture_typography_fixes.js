const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SHOTS_DIR = path.join(__dirname, 'typography_fix_screenshots');
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });

async function run() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. TEST PRELOADER
  console.log('Testing Preloader...');
  const preloaderContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const preloaderPage = await preloaderContext.newPage();
  await preloaderPage.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await preloaderPage.waitForTimeout(1400); // Wait for characters to complete initial reveal
  await preloaderPage.screenshot({ path: path.join(SHOTS_DIR, '01_preloader_fixed.png') });
  console.log('Captured: 01_preloader_fixed.png');
  await preloaderContext.close();

  // Viewports to test
  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'laptop_1280', width: 1280, height: 800 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844 },
    { name: 'small_mobile_375', width: 375, height: 812 }
  ];

  for (const vp of viewports) {
    console.log(`\nTesting viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    // Fast preloader skip
    await page.addInitScript(() => {
      try { sessionStorage.setItem('hasVisited', 'true'); } catch (e) {}
    });

    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Wait for preloader to vanish
    await page.waitForFunction(() => {
      const p = document.querySelector('[data-preloader]');
      return !p || window.getComputedStyle(p).display === 'none' || window.getComputedStyle(p).opacity === '0';
    }, { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1500);

    // 1. Hero
    await page.screenshot({ path: path.join(SHOTS_DIR, `02_hero_${vp.name}.png`) });
    console.log(`Captured: 02_hero_${vp.name}.png`);

    // 2. Royal Gwalior City & Kalpi Bridge (Scroll to section)
    await page.evaluate(() => {
      const el = document.querySelector('.loc-intro-s');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(SHOTS_DIR, `03_royal_gwalior_${vp.name}.png`) });
    console.log(`Captured: 03_royal_gwalior_${vp.name}.png`);

    // 3. The Space To Live in
    await page.evaluate(() => {
      const el = document.querySelector('.interior-s');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(SHOTS_DIR, `04_space_to_live_${vp.name}.png`) });
    console.log(`Captured: 04_space_to_live_${vp.name}.png`);

    // 4. Footer Phone Number
    await page.evaluate(() => {
      const el = document.querySelector('.footer-s_contact') || document.querySelector('.footer-s');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(SHOTS_DIR, `05_footer_phone_${vp.name}.png`) });
    console.log(`Captured: 05_footer_phone_${vp.name}.png`);

    await context.close();
  }

  // TEST CONTACT PAGE TITLE
  console.log('\nTesting Contact page...');
  const contactCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const contactPage = await contactCtx.newPage();
  await contactPage.addInitScript(() => {
    try { sessionStorage.setItem('hasVisited', 'true'); } catch (e) {}
  });
  await contactPage.goto('http://localhost:3000/contact', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await contactPage.waitForTimeout(2000);
  await contactPage.screenshot({ path: path.join(SHOTS_DIR, '06_contact_title.png') });
  console.log('Captured: 06_contact_title.png');
  await contactCtx.close();

  // TEST ROOM DETAIL SPECS
  console.log('Testing Room detail specs...');
  const roomCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const roomPage = await roomCtx.newPage();
  await roomPage.addInitScript(() => {
    try { sessionStorage.setItem('hasVisited', 'true'); } catch (e) {}
  });
  await roomPage.goto('http://localhost:3000/apartments/011', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await roomPage.waitForTimeout(2000);
  await roomPage.screenshot({ path: path.join(SHOTS_DIR, '07_room_011_specs.png') });
  console.log('Captured: 07_room_011_specs.png');
  await roomCtx.close();

  await browser.close();
  console.log('\nAll typography verification screenshots captured successfully!');
}

run().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
