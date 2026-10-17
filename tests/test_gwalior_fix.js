const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.addInitScript(() => {
    sessionStorage.setItem('hasVisited', 'true');
    localStorage.setItem('cookies', 'accepted');
  });

  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const p = document.querySelector('[data-preloader]');
    if (p) p.style.display = 'none';
  });
  await page.waitForTimeout(1000);

  // Test candidate CSS
  await page.addStyleTag({
    content: `
      /* Candidate Fix for GWALIOR overlap */
      .loc-intro-s_cap {
        grid-area: 1 / 1 / 2 / 3 !important;
        justify-self: center !important;
        align-self: center !important;
        z-index: 2 !important;
      }
      .loc-intro-s_cap .c1 {
        font-size: clamp(0.7rem, 0.9vw, 1rem) !important;
        letter-spacing: 0.2em !important;
        white-space: nowrap !important;
      }
      .loc-intro-s_title {
        grid-area: 1 / 3 / 2 / 6 !important;
        width: 100% !important;
        max-width: 100% !important;
        padding-right: clamp(16px, 2vw, 36px) !important;
        box-sizing: border-box !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: flex-start !important;
        z-index: 3 !important;
      }
      .loc-intro-s_title .h1 {
        width: 100% !important;
        font-size: clamp(2.2rem, 3.8vw, 4.6rem) !important;
        line-height: 1.08 !important;
        letter-spacing: 0.02em !important;
      }
      .loc-intro-s_title_line {
        display: block !important;
        white-space: nowrap !important;
        word-break: keep-all !important;
      }
      .loc-intro-s_title_line.is-1 {
        margin-left: 0 !important;
      }
      .loc-intro-s_title_line.is-2 {
        margin-left: clamp(1rem, 2vw, 2.5rem) !important;
      }
      .loc-intro-s_title_line.is-3 {
        margin-left: 0 !important;
      }
    `
  });

  // Scroll progressively so GSAP ScrollTrigger updates
  for (let y = 0; y <= 7700; y += 400) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(40);
  }
  await page.evaluate(() => window.scrollTo(0, 7700));
  await page.waitForTimeout(600);

  // Measure gap between GWALIOR and hotel photo
  const check = await page.evaluate(() => {
    const cap = document.querySelector('.loc-intro-s_cap');
    const title = document.querySelector('.loc-intro-s_title');
    const line1 = document.querySelector('.loc-intro-s_title_line.is-1');
    const line2 = document.querySelector('.loc-intro-s_title_line.is-2');
    const line3 = document.querySelector('.loc-intro-s_title_line.is-3');
    const img = document.querySelector('.loc-intro-s_img');

    const capR = cap ? cap.getBoundingClientRect() : null;
    const titleR = title ? title.getBoundingClientRect() : null;
    const l1R = line1 ? line1.getBoundingClientRect() : null;
    const l2R = line2 ? line2.getBoundingClientRect() : null;
    const l3R = line3 ? line3.getBoundingClientRect() : null;
    const imgR = img ? img.getBoundingClientRect() : null;

    const gapBetweenTextAndImg = imgR && l2R ? imgR.left - l2R.right : null;
    const gapBetweenCapAndTitle = titleR && capR ? titleR.left - capR.right : null;

    return {
      capR,
      titleR,
      l1R,
      l2R,
      l3R,
      imgR,
      gapBetweenTextAndImg,
      gapBetweenCapAndTitle,
      hasOverlapWithImg: gapBetweenTextAndImg < 0,
      hasOverlapWithCap: gapBetweenCapAndTitle < 0
    };
  });

  console.log('Candidate check result:\n', JSON.stringify(check, null, 2));

  await page.screenshot({ path: path.join(__dirname, 'gwalior_candidate_test.png') });
  console.log('Saved gwalior_candidate_test.png');

  await browser.close();
})();
