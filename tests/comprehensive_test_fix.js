const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const candidateCSS = `
  /* --- Candidate CSS Fix --- */
  @media screen and (min-width: 992px) {
    .loc-intro-s_cap {
      grid-area: 1 / 1 / 2 / 3 !important;
      justify-self: start !important;
      align-self: center !important;
      z-index: 2 !important;
      padding-left: clamp(10px, 1.5vw, 24px) !important;
    }
    .loc-intro-s_cap .c1 {
      font-size: clamp(0.72rem, 0.85vw, 0.95rem) !important;
      letter-spacing: 0.22em !important;
      white-space: nowrap !important;
    }
    .loc-intro-s_title {
      grid-area: 1 / 3 / 2 / 6 !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      padding-right: clamp(16px, 2vw, 32px) !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-self: center !important;
      align-items: flex-start !important;
      z-index: 2 !important;
    }
    .loc-intro-s_title .h1 {
      width: 100% !important;
      max-width: 100% !important;
      font-size: clamp(2.2rem, 3.4vw, 4.2rem) !important;
      line-height: 1.1 !important;
      letter-spacing: 0.02em !important;
    }
    .loc-intro-s_title_line {
      display: inline-block !important;
      width: fit-content !important;
      max-width: 100% !important;
      white-space: nowrap !important;
    }
    .loc-intro-s_title_line.is-1 {
      margin-left: 0 !important;
    }
    .loc-intro-s_title_line.is-2 {
      margin-left: clamp(0.8rem, 1.8vw, 2.2rem) !important;
    }
    .loc-intro-s_title_line.is-3 {
      margin-left: 0 !important;
    }
  }

  @media screen and (max-width: 991px) {
    .loc-intro-s_cap {
      grid-area: 1 / 1 / 2 / 3 !important;
      align-self: center !important;
    }
    .loc-intro-s_cap .c1 {
      font-size: clamp(0.65rem, 1.8vw, 0.85rem) !important;
      letter-spacing: 0.18em !important;
      white-space: nowrap !important;
    }
    .loc-intro-s_title {
      grid-area: 1 / 2 / 2 / 5 !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      z-index: 2 !important;
      align-self: center !important;
    }
    .loc-intro-s_title .h1 {
      font-size: clamp(1.8rem, 5.5vw, 3rem) !important;
      line-height: 1.15 !important;
    }
    .loc-intro-s_title_line {
      display: block !important;
      white-space: nowrap !important;
    }
    .loc-intro-s_title_line.is-1 {
      margin-left: 0 !important;
    }
    .loc-intro-s_title_line.is-2 {
      margin-left: 0 !important;
    }
    .loc-intro-s_title_line.is-3 {
      margin-left: 0 !important;
    }
    .loc-intro-s_img {
      grid-area: 2 / 2 / 3 / 5 !important;
      aspect-ratio: 3 / 4 !important;
    }
    .loc-intro-s_desc {
      grid-area: 3 / 2 / 4 / 5 !important;
    }
    .loc-intro-s_btn {
      grid-area: 4 / 2 / 5 / 5 !important;
    }
  }
`;

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
      // Ensure image source is set to hotel front view
      const img = document.querySelector('.loc-intro-s_img img');
      if (img) {
        img.src = '/assets/narayanam/facilities/hotel-front-view.jpg';
        img.srcset = '/assets/narayanam/facilities/hotel-front-view.jpg 1920w';
      }
    });

    await page.addStyleTag({ content: candidateCSS });
    await page.waitForTimeout(800);

    // Scroll through the entire range to test all animation states
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    const scrollStep = vp.width <= 768 ? 200 : 300;
    let worstGap = 999999;
    let worstScrollY = 0;
    let captured = false;

    const issues = [];

    for (let y = 0; y <= maxScroll; y += scrollStep) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await page.waitForTimeout(25);

      const check = await page.evaluate(() => {
        const title = document.querySelector('.loc-intro-s_title');
        const cap = document.querySelector('.loc-intro-s_cap');
        const l1 = document.querySelector('.loc-intro-s_title_line.is-1');
        const l2 = document.querySelector('.loc-intro-s_title_line.is-2');
        const l3 = document.querySelector('.loc-intro-s_title_line.is-3');
        const img = document.querySelector('.loc-intro-s_img');

        if (!title || !img) return null;

        const tr = title.getBoundingClientRect();
        const ir = img.getBoundingClientRect();
        const cr = cap ? cap.getBoundingClientRect() : null;
        const l1r = l1 ? l1.getBoundingClientRect() : null;
        const l2r = l2 ? l2.getBoundingClientRect() : null;
        const l3r = l3 ? l3.getBoundingClientRect() : null;

        // Is loc-intro-s on screen?
        const isVisible = (tr.top < window.innerHeight && tr.bottom > 0 && tr.left < window.innerWidth && tr.right > 0) ||
                          (ir.top < window.innerHeight && ir.bottom > 0 && ir.left < window.innerWidth && ir.right > 0);

        if (!isVisible) return null;

        // Calculate overlap / gap with image
        // If image is beside text (desktop/laptop)
        const isSideBySide = ir.left >= tr.left;
        let gapToImg = 99999;
        if (isSideBySide) {
          const maxRight = Math.max(
            l1r ? l1r.right : 0,
            l2r ? l2r.right : 0,
            l3r ? l3r.right : 0,
            tr.right
          );
          gapToImg = ir.left - maxRight;
        } else {
          // Stacked vertically (mobile/tablet)
          const maxBottom = Math.max(
            l1r ? l1r.bottom : 0,
            l2r ? l2r.bottom : 0,
            l3r ? l3r.bottom : 0,
            tr.bottom
          );
          gapToImg = ir.top - maxBottom;
        }

        // Gap between cap and title
        let gapCapTitle = 99999;
        if (cr && isSideBySide) {
          const minTitleLeft = Math.min(
            l1r ? l1r.left : 9999,
            l2r ? l2r.left : 9999,
            l3r ? l3r.left : 9999,
            tr.left
          );
          gapCapTitle = minTitleLeft - cr.right;
        }

        return {
          isVisible,
          isSideBySide,
          gapToImg,
          gapCapTitle,
          l2Right: l2r ? l2r.right : 0,
          imgLeft: ir.left,
          trLeft: tr.left,
          trRight: tr.right,
          crRight: cr ? cr.right : 0
        };
      });

      if (check && check.isVisible) {
        if (check.gapToImg < worstGap) {
          worstGap = check.gapToImg;
          worstScrollY = y;
        }
        if (check.gapToImg < 0) {
          issues.push({ y, error: `Overlap with image: gap = ${check.gapToImg}px` });
        }
        if (check.gapCapTitle < 0) {
          issues.push({ y, error: `Collision between cap and title: gap = ${check.gapCapTitle}px` });
        }
      }
    }

    console.log(`\n=== Viewport ${vp.name} (${vp.width}x${vp.height}) ===`);
    console.log(`Worst gap to image during scroll: ${worstGap.toFixed(1)}px at y=${worstScrollY}`);
    console.log(`Issues found: ${issues.length}`);
    if (issues.length > 0) {
      console.log('Issues:', issues.slice(0, 5));
    }

    // Take screenshot at the position where loc-intro is centered
    // For desktop, scroll to ~7600
    const snapY = vp.width > 991 ? 7600 : (vp.width === 768 ? 9450 : 4650);
    await page.evaluate((y) => window.scrollTo(0, y), snapY);
    await page.waitForTimeout(500);

    const screenshotPath = path.join(__dirname, `candidate_${vp.name}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`Saved screenshot: ${screenshotPath}`);

    await page.close();
  }

  await browser.close();
})();
