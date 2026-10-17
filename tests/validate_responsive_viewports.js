const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const viewports = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1280x800', width: 1280, height: 800 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 }
];

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const results = [];

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

    // Find scroll positions where loc-intro-s is visible
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    const step = vp.width <= 768 ? 200 : 300;

    let minGapToImg = Infinity;
    let worstScrollY = 0;
    let overlapDetected = false;

    // Test across scroll states
    for (let y = 0; y <= maxScroll; y += step) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await page.waitForTimeout(20);

      const metrics = await page.evaluate(() => {
        const title = document.querySelector('.loc-intro-s_title');
        const cap = document.querySelector('.loc-intro-s_cap');
        const l1 = document.querySelector('.loc-intro-s_title_line.is-1');
        const l2 = document.querySelector('.loc-intro-s_title_line.is-2');
        const l3 = document.querySelector('.loc-intro-s_title_line.is-3');
        const img = document.querySelector('.loc-intro-s_img');

        if (!title || !img) return null;

        const tr = title.getBoundingClientRect();
        const ir = img.getBoundingClientRect();
        const l2r = l2 ? l2.getBoundingClientRect() : null;
        const cr = cap ? cap.getBoundingClientRect() : null;

        const isVisible = (tr.top < window.innerHeight && tr.bottom > 0 && tr.left < window.innerWidth && tr.right > 0) ||
                          (ir.top < window.innerHeight && ir.bottom > 0 && ir.left < window.innerWidth && ir.right > 0);

        if (!isVisible) return null;

        // On desktop/laptop: side by side
        // On tablet/mobile: stacked vertically
        const sideBySide = ir.left >= tr.left;
        let gapToImg;
        if (sideBySide) {
          gapToImg = ir.left - (l2r ? l2r.right : tr.right);
        } else {
          gapToImg = ir.top - tr.bottom;
        }

        let gapToCap = Infinity;
        if (cr && sideBySide) {
          gapToCap = (l2r ? l2r.left : tr.left) - cr.right;
        }

        return {
          isVisible,
          sideBySide,
          gapToImg,
          gapToCap,
          l2Right: l2r ? l2r.right : 0,
          imgLeft: ir.left,
          imgTop: ir.top,
          trBottom: tr.bottom
        };
      });

      if (metrics && metrics.isVisible) {
        if (metrics.gapToImg < minGapToImg) {
          minGapToImg = metrics.gapToImg;
          worstScrollY = y;
        }
        if (metrics.gapToImg < 0) {
          overlapDetected = true;
        }
      }
    }

    // Scroll to the optimal viewpoint showing the hero text panel and photograph
    // For desktop / laptop, find the scroll where title is in the center
    const targetScroll = await page.evaluate((width) => {
      if (width > 991) {
        return 7650;
      }
      const title = document.querySelector('.loc-intro-s_title');
      if (!title) return 0;
      return title.getBoundingClientRect().top + window.scrollY - 100;
    }, vp.width);

    await page.evaluate((y) => window.scrollTo(0, y), targetScroll);
    await page.waitForTimeout(600);

    const shotName = `verified_${vp.name}.png`;
    const shotPath = path.join(__dirname, shotName);
    await page.screenshot({ path: shotPath });

    const checkResult = {
      viewport: vp.name,
      minGapToImgDuringScroll: `${minGapToImg.toFixed(1)}px`,
      worstScrollY,
      overlapDetected,
      screenshot: shotName
    };
    results.push(checkResult);
    console.log(`Viewport ${vp.name} Result:`, checkResult);

    await page.close();
  }

  console.log('\nFINAL VALIDATION SUMMARY:');
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
})();
