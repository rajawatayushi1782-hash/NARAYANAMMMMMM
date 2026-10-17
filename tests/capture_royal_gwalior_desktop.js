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

  // Position track and reveal
  await page.evaluate(() => {
    window.scrollTo(0, 6181);
    const track = document.querySelector('.loc-scroll-area_track');
    const introW = document.querySelector('.loc-intro-w');
    if (track && introW) {
      // Set track x translation directly to show loc-intro-w
      gsap.set(track, { x: -introW.offsetLeft });
    }

    // Call reveal or force styles on all items in loc-intro-s
    const introS = document.querySelector('.loc-intro-s');
    if (introS) {
      introS.querySelectorAll('*').forEach(el => {
        if (el._split) {
          if (el._split.chars) {
            gsap.set(el._split.chars, { opacity: 1, yPercent: 0, rotateY: 0, x: 0 });
          }
          if (el._split.lines) {
            gsap.set(el._split.lines, { yPercent: 0, opacity: 1 });
          }
          if (el._split.words) {
            gsap.set(el._split.words, { opacity: 1 });
          }
        }
      });
      // Also ensure title and lines are visible
      const titleLines = introS.querySelectorAll('.loc-intro-s_title_line');
      titleLines.forEach(line => {
        gsap.set(line, { opacity: 1, visibility: 'visible' });
      });
      const desc = introS.querySelector('.loc-intro-s_desc');
      if (desc) gsap.set(desc, { opacity: 1, visibility: 'visible' });
    }
  });

  await page.waitForTimeout(1000);
  const introSHandle = await page.$('.loc-intro-s');
  if (introSHandle) {
    await introSHandle.screenshot({ path: 'tests/exact_check_screenshots/02_desktop_royal_gwalior_revealed.png' });
    console.log('Saved 02_desktop_royal_gwalior_revealed.png');
  }
  await browser.close();
})();
