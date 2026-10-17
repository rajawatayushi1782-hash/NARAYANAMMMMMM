const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

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
    await page.waitForTimeout(1000);

    // Find the scroll position where .loc-intro-s_title is in the viewport
    const locPos = await page.evaluate(() => {
      const title = document.querySelector('.loc-intro-s_title');
      const img = document.querySelector('.loc-intro-s_img');
      const sec = document.querySelector('.loc-intro-s');
      const winH = window.innerHeight;

      // Find scroll position where title is around top 100px
      const rect = title.getBoundingClientRect();
      const scrollY = window.scrollY;
      const absTop = rect.top + scrollY;

      return {
        absTop,
        gridComputed: window.getComputedStyle(sec.querySelector('.grid')).gridTemplateColumns,
        titleDisplay: window.getComputedStyle(title).display,
        titleGridArea: window.getComputedStyle(title).gridArea,
        imgGridArea: window.getComputedStyle(img).gridArea
      };
    });

    console.log(`Viewport ${width}x${height} layout:`, locPos);

    // Scroll to absTop - 50
    await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 50)), locPos.absTop);
    await page.waitForTimeout(500);

    const afterScroll = await page.evaluate(() => {
      const title = document.querySelector('.loc-intro-s_title');
      const l2 = document.querySelector('.loc-intro-s_title_line.is-2');
      const img = document.querySelector('.loc-intro-s_img');
      const cap = document.querySelector('.loc-intro-s_cap');

      return {
        capR: cap?.getBoundingClientRect(),
        titleR: title?.getBoundingClientRect(),
        l2R: l2?.getBoundingClientRect(),
        imgR: img?.getBoundingClientRect()
      };
    });

    console.log(`Viewport ${width}x${height} rects after scroll:`, afterScroll);

    await page.screenshot({ path: `tests/inspect_mobile_${width}.png` });

    await page.close();
  }

  await browser.close();
})();
