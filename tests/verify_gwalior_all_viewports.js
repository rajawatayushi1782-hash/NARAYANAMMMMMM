const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const viewports = [
  { name: 'desktop_1440', width: 1440, height: 900 },
  { name: 'laptop_1280', width: 1280, height: 800 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'mobile_390', width: 390, height: 844 }
];

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
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

    // Scroll progressively to find where .loc-intro-s is visible
    let bestY = 0;
    let minDiff = 999999;
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

    for (let y = 0; y <= maxScroll; y += (vp.width <= 768 ? 200 : 300)) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await page.waitForTimeout(30);

      const res = await page.evaluate((vpw) => {
        const title = document.querySelector('.loc-intro-s_title');
        const img = document.querySelector('.loc-intro-s_img');
        if (!title) return null;
        const tr = title.getBoundingClientRect();
        const ir = img ? img.getBoundingClientRect() : null;
        return {
          titleLeft: tr.left,
          titleTop: tr.top,
          titleVisible: tr.top < window.innerHeight && tr.bottom > 0 && tr.left < window.innerWidth && tr.right > 0,
          imgLeft: ir ? ir.left : null,
          imgTop: ir ? ir.top : null
        };
      }, vp.width);

      if (res && res.titleVisible) {
        const diff = Math.abs(res.titleTop - 100);
        if (diff < minDiff) {
          minDiff = diff;
          bestY = y;
        }
      }
    }

    console.log(`Viewport ${vp.name}: best scroll y = ${bestY}`);
    if (bestY > 0) {
      await page.evaluate((y) => window.scrollTo(0, y), bestY);
      await page.waitForTimeout(500);
    }

    const metrics = await page.evaluate(() => {
      const cap = document.querySelector('.loc-intro-s_cap');
      const title = document.querySelector('.loc-intro-s_title');
      const l1 = document.querySelector('.loc-intro-s_title_line.is-1');
      const l2 = document.querySelector('.loc-intro-s_title_line.is-2');
      const l3 = document.querySelector('.loc-intro-s_title_line.is-3');
      const img = document.querySelector('.loc-intro-s_img');
      const grid = document.querySelector('.loc-intro-s .grid');

      const csGrid = grid ? window.getComputedStyle(grid) : null;
      const csTitle = title ? window.getComputedStyle(title) : null;
      const csImg = img ? window.getComputedStyle(img) : null;

      const capR = cap ? cap.getBoundingClientRect() : null;
      const l2R = l2 ? l2.getBoundingClientRect() : null;
      const imgR = img ? img.getBoundingClientRect() : null;

      return {
        display: csGrid ? csGrid.display : null,
        gridTemplateColumns: csGrid ? csGrid.gridTemplateColumns : null,
        titleGridArea: csTitle ? csTitle.gridArea : null,
        imgGridArea: csImg ? csImg.gridArea : null,
        capR,
        l2R,
        imgR,
        overlapWithImg: imgR && l2R ? (l2R.right > imgR.left && l2R.bottom > imgR.top && l2R.top < imgR.bottom) : false,
        overlapAmount: imgR && l2R ? l2R.right - imgR.left : 0,
        gap: imgR && l2R ? imgR.left - l2R.right : null
      };
    });

    console.log(`Viewport ${vp.name} metrics:`, JSON.stringify(metrics, null, 2));

    await page.screenshot({ path: path.join(__dirname, `current_${vp.name}.png`) });
    await page.close();
  }

  await browser.close();
})();
