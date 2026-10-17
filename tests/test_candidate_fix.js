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

  // Apply candidate CSS
  await page.addStyleTag({
    content: `
      .interior-s_title {
        grid-column: 1 / -1 !important;
        grid-row: 1 / 2 !important;
        grid-area: 1 / 1 / 2 / -1 !important;
        width: 100% !important;
        max-width: 1000px !important;
        margin: 0 auto !important;
        text-align: center !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        overflow: visible !important;
      }
      .interior_heading_h1,
      .interior-s_title .h1 {
        width: 100% !important;
        text-align: center !important;
      }
      .interior-line {
        display: inline-block !important;
        white-space: nowrap !important;
        font-family: var(--_typography---font-family--serif, 'Cinzel', serif) !important;
        font-size: clamp(2.4rem, 5.2vw, 5.6rem) !important;
        line-height: 1.15 !important;
        letter-spacing: 0.04em !important;
        text-transform: uppercase !important;
        color: var(--narayanam-dark) !important;
      }
      .interior-s_title_a {
        margin-top: clamp(0.5rem, 1.2vw, 1.2rem) !important;
        margin-left: 0 !important;
        transform: none !important;
      }
      .interior-s_title_a .a1 {
        font-family: var(--_typography---font-family--accent, 'Playfair Display', serif) !important;
        font-size: clamp(2.2rem, 4.5vw, 4.8rem) !important;
        line-height: 1.15 !important;
        white-space: nowrap !important;
        color: var(--narayanam-gold) !important;
        font-style: italic !important;
      }
      .section.arch:not(.theme_on-brand) {
        border-top-left-radius: 50% clamp(140px, 18vw, 260px) !important;
        border-top-right-radius: 50% clamp(140px, 18vw, 260px) !important;
      }
      .interior-s > .u-272:first-child {
        height: clamp(60px, 10vh, 120px) !important;
      }
    `
  });

  // Update heading in DOM to 'The Space To'
  await page.evaluate(() => {
    const h2 = document.querySelector('.interior_heading_h1');
    if (h2) {
      h2.innerHTML = '<span class="interior-line">The Space To</span>';
    }
  });

  const scrollPositions = [14600, 14750, 14950, 15150];
  for (const pos of scrollPositions) {
    await page.evaluate((y) => window.scrollTo(0, y), pos);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(__dirname, 'space_to_live_investigation', `opt2_${pos}.png`) });
    console.log(`Saved opt2_${pos}.png`);
  }

  await browser.close();
})();
