const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SHOTS_DIR = path.join(__dirname, 'exact_check_screenshots');
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });

async function check() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Dismiss cookie banner via localStorage so it doesn't block any view
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem('hasVisited', 'true');
      localStorage.setItem('cookies', 'accepted');
    } catch (e) {}
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Helper to scroll and trigger all animations
  async function scrollToElement(selector) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
        window.scrollBy(0, 10);
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
          window.ScrollTrigger.update();
        }
        // Force reveal if still hidden by initial state
        const items = el.querySelectorAll('[data-scroll-reveal]');
        items.forEach(item => {
          gsap.set(item, { opacity: 1, visibility: 'visible' });
          if (item._split && item._split.chars) {
            gsap.set(item._split.chars, { opacity: 1, yPercent: 0, rotateY: 0, rotateX: 0 });
          }
          if (item._split && item._split.lines) {
            gsap.set(item._split.lines, { yPercent: 0 });
          }
        });
      }
    }, selector);
    await page.waitForTimeout(1000);
  }

  // 1. Hero Logo
  const heroLogo = await page.$('.hero-s_logo');
  if (heroLogo) {
    await heroLogo.screenshot({ path: path.join(SHOTS_DIR, '01_hero_logo.png') });
    console.log('Saved: 01_hero_logo.png');
  }

  // 2. Royal Gwalior City & Kalpi Bridge
  await scrollToElement('.loc-intro-s');
  const locTitle = await page.$('.loc-intro-s');
  if (locTitle) {
    await locTitle.screenshot({ path: path.join(SHOTS_DIR, '02_royal_gwalior_section.png') });
    console.log('Saved: 02_royal_gwalior_section.png');
  }

  // 3. The Space To Live
  await scrollToElement('.interior-s');
  const spaceTitle = await page.$('.interior-s');
  if (spaceTitle) {
    await spaceTitle.screenshot({ path: path.join(SHOTS_DIR, '03_space_to_live_section.png') });
    console.log('Saved: 03_space_to_live_section.png');
  }

  // 4. Footer Contact
  await scrollToElement('.footer-s_contact');
  const footerContact = await page.$('.footer-s_contact');
  if (footerContact) {
    await footerContact.screenshot({ path: path.join(SHOTS_DIR, '04_footer_contact.png') });
    console.log('Saved: 04_footer_contact.png');
  }

  // 5. Preloader element (Test on new page with preloader visible)
  const preloaderPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await preloaderPage.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await preloaderPage.waitForTimeout(2000);
  await preloaderPage.evaluate(() => {
    const el = document.querySelector('.preloader_logo');
    if (el) {
      const items = el.querySelectorAll('[data-part]');
      items.forEach(item => {
        gsap.set(item, { opacity: 1, visibility: 'visible' });
        if (item._split && item._split.chars) {
          gsap.set(item._split.chars, { opacity: 1, yPercent: 0, rotateY: 0, rotateX: 0 });
        }
      });
    }
  });
  await preloaderPage.waitForTimeout(500);
  const preloaderEl = await preloaderPage.$('.preloader_logo');
  if (preloaderEl) {
    await preloaderEl.screenshot({ path: path.join(SHOTS_DIR, '05_preloader_logo.png') });
    console.log('Saved: 05_preloader_logo.png');
  }
  await preloaderPage.close();

  // 6. Mobile 390
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.addInitScript(() => {
    try {
      sessionStorage.setItem('hasVisited', 'true');
      localStorage.setItem('cookies', 'accepted');
    } catch (e) {}
  });
  await mobilePage.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await mobilePage.waitForTimeout(2000);

  const mHero = await mobilePage.$('.hero-s_logo');
  if (mHero) {
    await mHero.screenshot({ path: path.join(SHOTS_DIR, '06_mobile_hero_logo.png') });
    console.log('Saved: 06_mobile_hero_logo.png');
  }

  // Mobile Royal Gwalior
  await mobilePage.evaluate(() => {
    const el = document.querySelector('.loc-intro-s');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
      const items = el.querySelectorAll('[data-scroll-reveal]');
      items.forEach(item => {
        gsap.set(item, { opacity: 1, visibility: 'visible' });
        if (item._split && item._split.chars) {
          gsap.set(item._split.chars, { opacity: 1, yPercent: 0, rotateY: 0, rotateX: 0 });
        }
      });
    }
  });
  await mobilePage.waitForTimeout(1000);
  const mLoc = await mobilePage.$('.loc-intro-s');
  if (mLoc) {
    await mLoc.screenshot({ path: path.join(SHOTS_DIR, '07_mobile_royal_gwalior.png') });
    console.log('Saved: 07_mobile_royal_gwalior.png');
  }

  // Mobile Space To Live
  await mobilePage.evaluate(() => {
    const el = document.querySelector('.interior-s');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
      const items = el.querySelectorAll('[data-scroll-reveal]');
      items.forEach(item => {
        gsap.set(item, { opacity: 1, visibility: 'visible' });
        if (item._split && item._split.chars) {
          gsap.set(item._split.chars, { opacity: 1, yPercent: 0, rotateY: 0, rotateX: 0 });
        }
      });
    }
  });
  await mobilePage.waitForTimeout(1000);
  const mSpace = await mobilePage.$('.interior-s');
  if (mSpace) {
    await mSpace.screenshot({ path: path.join(SHOTS_DIR, '08_mobile_space_to_live.png') });
    console.log('Saved: 08_mobile_space_to_live.png');
  }

  await mobilePage.close();
  await page.close();
  await browser.close();
  console.log('All exact checks completed with full reveal!');
}

check().catch(err => {
  console.error('Check failed:', err);
  process.exit(1);
});
