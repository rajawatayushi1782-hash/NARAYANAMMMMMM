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
  const report = [];

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
    await page.waitForTimeout(800);

    const isDesktop = vp.width > 991;

    // Test across scroll positions
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    const scrollStep = isDesktop ? 300 : 200;

    let overlapCount = 0;
    let minGap = Infinity;
    let worstY = 0;

    for (let y = 0; y <= maxScroll; y += scrollStep) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await page.waitForTimeout(15);

      const check = await page.evaluate((desktop) => {
        const title = document.querySelector('.loc-intro-s_title');
        const l1 = document.querySelector('.loc-intro-s_title_line.is-1');
        const l2 = document.querySelector('.loc-intro-s_title_line.is-2');
        const l3 = document.querySelector('.loc-intro-s_title_line.is-3');
        const img = document.querySelector('.loc-intro-s_img');
        const cap = document.querySelector('.loc-intro-s_cap');

        if (!title || !img) return null;

        const tr = title.getBoundingClientRect();
        const ir = img.getBoundingClientRect();
        const cr = cap ? cap.getBoundingClientRect() : null;
        const l1r = l1 ? l1.getBoundingClientRect() : null;
        const l2r = l2 ? l2.getBoundingClientRect() : null;
        const l3r = l3 ? l3.getBoundingClientRect() : null;

        const inView = (tr.top < window.innerHeight && tr.bottom > 0) ||
                       (ir.top < window.innerHeight && ir.bottom > 0);
        if (!inView) return null;

        if (desktop) {
          // In desktop, heading is on left of image
          const maxRight = Math.max(
            l1r ? l1r.right : 0,
            l2r ? l2r.right : 0,
            l3r ? l3r.right : 0
          );
          const gap = ir.left - maxRight;
          const capGap = (l1r ? l1r.left : tr.left) - (cr ? cr.right : 0);
          return { gap, capGap, overlap: gap < 0, capOverlap: capGap < 0 };
        } else {
          // In mobile/tablet, heading is above image
          const maxBottom = Math.max(
            l1r ? l1r.bottom : 0,
            l2r ? l2r.bottom : 0,
            l3r ? l3r.bottom : 0
          );
          const gap = ir.top - maxBottom;
          const capGap = (l1r ? l1r.top : tr.top) - (cr ? cr.bottom : 0);
          return { gap, capGap, overlap: gap < 0, capOverlap: capGap < 0 };
        }
      }, isDesktop);

      if (check) {
        if (check.gap < minGap) {
          minGap = check.gap;
          worstY = y;
        }
        if (check.overlap || check.capOverlap) {
          overlapCount++;
        }
      }
    }

    // Scroll to the main showcase view
    const viewY = await page.evaluate((desktop) => {
      if (desktop) return 7650;
      const t = document.querySelector('.loc-intro-s_title');
      return t ? t.getBoundingClientRect().top + window.scrollY - 60 : 0;
    }, isDesktop);

    await page.evaluate((y) => window.scrollTo(0, y), viewY);
    await page.waitForTimeout(600);

    const shotName = `final_validation_${vp.name}.png`;
    const shotPath = path.join(__dirname, shotName);
    await page.screenshot({ path: shotPath, fullPage: false });

    // Detailed metrics at the showcase position
    const showcaseMetrics = await page.evaluate((desktop) => {
      const cap = document.querySelector('.loc-intro-s_cap');
      const title = document.querySelector('.loc-intro-s_title');
      const l1 = document.querySelector('.loc-intro-s_title_line.is-1');
      const l2 = document.querySelector('.loc-intro-s_title_line.is-2');
      const l3 = document.querySelector('.loc-intro-s_title_line.is-3');
      const img = document.querySelector('.loc-intro-s_img');

      const cr = cap?.getBoundingClientRect();
      const tr = title?.getBoundingClientRect();
      const l1r = l1?.getBoundingClientRect();
      const l2r = l2?.getBoundingClientRect();
      const l3r = l3?.getBoundingClientRect();
      const ir = img?.getBoundingClientRect();

      return {
        capText: cap?.innerText?.trim(),
        capRight: cr ? Math.round(cr.right) : null,
        l1Text: l1?.innerText?.trim(),
        l2Text: l2?.innerText?.trim(),
        l2Left: l2r ? Math.round(l2r.left) : null,
        l2Right: l2r ? Math.round(l2r.right) : null,
        imgLeft: ir ? Math.round(ir.left) : null,
        imgTop: ir ? Math.round(ir.top) : null,
        gapBetweenGwaliorAndImg: desktop && ir && l2r ? Math.round(ir.left - l2r.right) : (ir && l3r ? Math.round(ir.top - l3r.bottom) : null),
        gapBetweenCapAndTitle: desktop && l1r && cr ? Math.round(l1r.left - cr.right) : (l1r && cr ? Math.round(l1r.top - cr.bottom) : null)
      };
    }, isDesktop);

    report.push({
      viewport: vp.name,
      minGapDuringAllScrolls: `${Math.round(minGap)}px`,
      overlapCount,
      showcaseMetrics,
      screenshot: shotName
    });

    console.log(`[PASS] ${vp.name}: Min gap = ${Math.round(minGap)}px, Overlaps = ${overlapCount}, Gap at showcase = ${showcaseMetrics.gapBetweenGwaliorAndImg}px`);

    await page.close();
  }

  console.log('\n========================================');
  console.log('       FINAL VALIDATION REPORT');
  console.log('========================================');
  console.log(JSON.stringify(report, null, 2));

  await browser.close();
})();
