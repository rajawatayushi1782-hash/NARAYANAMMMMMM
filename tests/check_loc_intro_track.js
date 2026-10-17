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

  // We want to scroll until .loc-intro-s is visible on screen
  // Let's do a step scroll or compute the exact offset
  await page.evaluate(async () => {
    const locIntro = document.querySelector('.loc-intro-s');
    const area = document.querySelector('.loc-scroll-area');
    if (!locIntro || !area) return;

    // The scroll-area height is set by slater.js based on track scrollWidth
    // Let's find the scroll position where locIntro.getBoundingClientRect().left is within viewport [0, 500]
    const areaTop = area.getBoundingClientRect().top + window.scrollY;
    
    // Test scroll positions
    for (let offset = 0; offset <= 5000; offset += 100) {
      window.scrollTo(0, areaTop + offset);
      if (window.ScrollTrigger) {
        window.ScrollTrigger.update();
      }
      const rect = locIntro.getBoundingClientRect();
      if (rect.left < 500 && rect.right > 500) {
        console.log('Found offset:', offset, 'rect:', rect);
        break;
      }
    }

    // Force reveal all characters in .loc-intro-s
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
  await page.screenshot({ path: 'tests/exact_check_screenshots/02_desktop_royal_gwalior_in_track.png' });
  console.log('Saved: 02_desktop_royal_gwalior_in_track.png');

  await browser.close();
})();
