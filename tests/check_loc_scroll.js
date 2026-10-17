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
  await page.waitForTimeout(2500);

  // Scroll to loc-scroll-area start
  await page.evaluate(() => {
    const area = document.querySelector('.loc-scroll-area');
    if (area) {
      const top = area.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + 100);
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
        window.ScrollTrigger.update();
      }
    }
    document.querySelectorAll('.loc-intro-s [data-scroll-reveal]').forEach(el => {
      gsap.set(el, { opacity: 1, visibility: 'visible' });
      if (el._split && el._split.chars) {
        gsap.set(el._split.chars, { opacity: 1, yPercent: 0, rotateY: 0, rotateX: 0 });
      }
      if (el._split && el._split.lines) {
        gsap.set(el._split.lines, { yPercent: 0 });
      }
    });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'tests/exact_check_screenshots/02_desktop_loc_scroll.png' });
  console.log('Saved 02_desktop_loc_scroll.png');

  await browser.close();
})();
