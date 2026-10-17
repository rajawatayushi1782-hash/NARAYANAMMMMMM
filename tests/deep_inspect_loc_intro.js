const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

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

  // Progressive scroll to loc-intro
  for (let y = 0; y <= 7700; y += 400) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(30);
  }
  await page.evaluate(() => window.scrollTo(0, 7700));
  await page.waitForTimeout(500);

  const info = await page.evaluate(() => {
    const section = document.querySelector('.loc-intro-w');
    const locIntroS = document.querySelector('.loc-intro-s');
    const grid = document.querySelector('.loc-intro-s .grid');
    const cap = document.querySelector('.loc-intro-s_cap');
    const title = document.querySelector('.loc-intro-s_title');
    const h1 = title ? title.querySelector('.h1') : null;
    const l1 = document.querySelector('.loc-intro-s_title_line.is-1');
    const l2 = document.querySelector('.loc-intro-s_title_line.is-2');
    const l3 = document.querySelector('.loc-intro-s_title_line.is-3');
    const img = document.querySelector('.loc-intro-s_img');
    const desc = document.querySelector('.loc-intro-s_desc');
    const btn = document.querySelector('.loc-intro-s_btn');

    function getDetails(el) {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        className: el.className,
        tagName: el.tagName,
        gridArea: cs.gridArea,
        gridColumn: cs.gridColumn,
        gridRow: cs.gridRow,
        display: cs.display,
        position: cs.position,
        transform: cs.transform,
        fontSize: cs.fontSize,
        fontFamily: cs.fontFamily,
        letterSpacing: cs.letterSpacing,
        lineHeight: cs.lineHeight,
        margin: cs.margin,
        padding: cs.padding,
        width: cs.width,
        maxWidth: cs.maxWidth,
        rect: {
          left: r.left,
          right: r.right,
          top: r.top,
          bottom: r.bottom,
          width: r.width,
          height: r.height
        }
      };
    }

    // Check matched CSS rules
    function getMatchedRules(el) {
      if (!el) return [];
      const rules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules || []) {
            if (rule.selectorText && el.matches(rule.selectorText)) {
              rules.push({ selector: rule.selectorText, cssText: rule.cssText });
            }
          }
        } catch(e) {}
      }
      return rules;
    }

    return {
      windowWidth: window.innerWidth,
      gridComputed: {
        gridTemplateColumns: window.getComputedStyle(grid).gridTemplateColumns,
        gridTemplateRows: window.getComputedStyle(grid).gridTemplateRows,
        columnGap: window.getComputedStyle(grid).columnGap,
        rowGap: window.getComputedStyle(grid).rowGap,
        rect: grid.getBoundingClientRect()
      },
      cap: getDetails(cap),
      title: getDetails(title),
      h1: getDetails(h1),
      l1: getDetails(l1),
      l2: getDetails(l2),
      l3: getDetails(l3),
      img: getDetails(img),
      desc: getDetails(desc),
      btn: getDetails(btn),
      titleRules: getMatchedRules(title),
      imgRules: getMatchedRules(img)
    };
  });

  console.log(JSON.stringify(info, null, 2));

  await browser.close();
})();
