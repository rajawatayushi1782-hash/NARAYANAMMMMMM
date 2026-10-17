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
  await page.evaluate(() => {
    const p = document.querySelector('[data-preloader]');
    if (p) p.style.display = 'none';
  });
  await page.waitForTimeout(1000);

  // Scroll to loc-intro where it's visible on screen (y = 7700)
  await page.evaluate(() => window.scrollTo(0, 7700));
  await page.waitForTimeout(600);

  const gridInfo = await page.evaluate(() => {
    const grid = document.querySelector('.loc-intro-s .grid');
    const cap = document.querySelector('.loc-intro-s_cap');
    const title = document.querySelector('.loc-intro-s_title');
    const img = document.querySelector('.loc-intro-s_img');

    const cs = window.getComputedStyle(grid);
    const colTracks = cs.gridTemplateColumns.split(' ').map(s => parseFloat(s));
    const colGap = parseFloat(cs.columnGap) || 0;
    const gridRect = grid.getBoundingClientRect();

    let curLeft = gridRect.left;
    const columns = [];
    colTracks.forEach((w, idx) => {
      columns.push({
        colIndex: idx + 1,
        left: curLeft,
        right: curLeft + w,
        width: w
      });
      curLeft += w + colGap;
    });

    return {
      gridRect: { left: gridRect.left, right: gridRect.right, width: gridRect.width },
      colGap,
      columns,
      capRect: cap.getBoundingClientRect(),
      titleRect: title.getBoundingClientRect(),
      imgRect: img.getBoundingClientRect()
    };
  });

  console.log('Columns and Elements at y=7700:');
  console.log(JSON.stringify(gridInfo, null, 2));

  await browser.close();
})();
