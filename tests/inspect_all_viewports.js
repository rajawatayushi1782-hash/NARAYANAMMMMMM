const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

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

    // Find scroll range where loc-intro is visible
    const scrollInfo = await page.evaluate(() => {
      const el = document.querySelector('.loc-intro-w');
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      return { offsetTop: el ? el.offsetTop : 0, maxScroll };
    });

    // Check multiple scroll positions to find where loc-intro is centered
    let bestY = 0;
    let minGap = -999999;
    for (let y = 0; y <= scrollInfo.maxScroll; y += (vp.width <= 768 ? 150 : 250)) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await page.waitForTimeout(20);
      const vis = await page.evaluate(() => {
        const title = document.querySelector('.loc-intro-s_title');
        const img = document.querySelector('.loc-intro-s_img');
        if (!title || !img) return null;
        const tr = title.getBoundingClientRect();
        const ir = img.getBoundingClientRect();
        const isVis = tr.top < window.innerHeight && tr.bottom > 0 && ir.top < window.innerHeight && ir.bottom > 0;
        return { isVis, trTop: tr.top, trLeft: tr.left };
      });
      if (vis && vis.isVis) {
        if (!bestY || Math.abs(vis.trTop - 200) < Math.abs(bestY - 200)) {
          bestY = y;
        }
      }
    }

    if (bestY > 0) {
      await page.evaluate((y) => window.scrollTo(0, y), bestY);
      await page.waitForTimeout(400);
    }

    const data = await page.evaluate(() => {
      const grid = document.querySelector('.loc-intro-s .grid');
      const cap = document.querySelector('.loc-intro-s_cap');
      const title = document.querySelector('.loc-intro-s_title');
      const h1 = title ? title.querySelector('.h1') : null;
      const l1 = document.querySelector('.loc-intro-s_title_line.is-1');
      const l2 = document.querySelector('.loc-intro-s_title_line.is-2');
      const l3 = document.querySelector('.loc-intro-s_title_line.is-3');
      const img = document.querySelector('.loc-intro-s_img');

      function b(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          left: Math.round(r.left),
          right: Math.round(r.right),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          width: Math.round(r.width),
          height: Math.round(r.height),
          gridArea: cs.gridArea,
          fontSize: cs.fontSize,
          transform: cs.transform
        };
      }

      const gridCs = grid ? window.getComputedStyle(grid) : null;

      return {
        gridDisplay: gridCs?.display,
        gridColumns: gridCs?.gridTemplateColumns,
        cap: b(cap),
        title: b(title),
        h1: b(h1),
        l1: b(l1),
        l2: b(l2),
        l3: b(l3),
        img: b(img),
        l2RightVsImgLeft: (b(img) && b(l2)) ? (b(l2).right - b(img).left) : null
      };
    });

    console.log(`=== Viewport ${vp.name} (${vp.width}x${vp.height}) at scroll y=${bestY} ===`);
    console.log(JSON.stringify(data, null, 2));

    await page.close();
  }

  await browser.close();
})();
