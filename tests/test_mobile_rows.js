const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const testCSS = `
  @media screen and (max-width: 991px) {
    .loc-intro-s .grid {
      grid-template-rows: auto auto auto auto auto !important;
      row-gap: 1.5rem !important;
    }
    .loc-intro-s_cap {
      grid-area: 1 / 2 / 2 / 5 !important;
      justify-self: start !important;
      align-self: center !important;
      margin-bottom: 0.5rem !important;
    }
    .loc-intro-s_cap .c1 {
      font-size: clamp(0.7rem, 2vw, 0.9rem) !important;
      letter-spacing: 0.2em !important;
      text-align: left !important;
    }
    .loc-intro-s_title {
      grid-area: 2 / 2 / 3 / 5 !important;
      width: 100% !important;
      max-width: 100% !important;
      margin-bottom: 1.5rem !important;
    }
    .loc-intro-s_title .h1 {
      font-size: clamp(2rem, 5.5vw, 3.2rem) !important;
      line-height: 1.15 !important;
      text-align: left !important;
    }
    .loc-intro-s_title_line {
      display: block !important;
      text-align: left !important;
    }
    .loc-intro-s_title_line.is-1 {
      margin-left: 0 !important;
    }
    .loc-intro-s_title_line.is-2 {
      margin-left: clamp(1rem, 3vw, 2rem) !important;
      text-align: left !important;
    }
    .loc-intro-s_title_line.is-3 {
      margin-left: 0 !important;
    }
    .loc-intro-s_img {
      grid-area: 3 / 2 / 4 / 5 !important;
      aspect-ratio: 16 / 10 !important;
      width: 100% !important;
    }
    .loc-intro-s_desc {
      grid-area: 4 / 2 / 5 / 5 !important;
    }
    .loc-intro-s_btn {
      grid-area: 5 / 2 / 6 / 5 !important;
    }
  }
`;

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });

  for (const width of [768, 390]) {
    const height = width === 768 ? 1024 : 844;
    const page = await browser.newPage({ viewport: { width, height } });
    await page.addInitScript(() => {
      sessionStorage.setItem('hasVisited', 'true');
      localStorage.setItem('cookies', 'accepted');
    });

    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const p = document.querySelector('[data-preloader]');
      if (p) p.style.display = 'none';
    });

    await page.addStyleTag({ content: testCSS });
    await page.waitForTimeout(600);

    // Scroll to title
    const pos = await page.evaluate(() => {
      const t = document.querySelector('.loc-intro-s_title');
      return t ? t.getBoundingClientRect().top + window.scrollY - 80 : 0;
    });

    await page.evaluate((y) => window.scrollTo(0, y), pos);
    await page.waitForTimeout(600);

    const shotPath = path.join(__dirname, `test_mobile_row_${width}.png`);
    await page.screenshot({ path: shotPath });
    console.log(`Saved: ${shotPath}`);

    await page.close();
  }

  await browser.close();
})();
