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

  const structure = await page.evaluate(() => {
    const el = document.querySelector('.loc-intro-w');
    const parents = [];
    let cur = el;
    while (cur && cur !== document.body) {
      const cs = window.getComputedStyle(cur);
      parents.push({
        tagName: cur.tagName,
        className: cur.className,
        id: cur.id,
        display: cs.display,
        position: cs.position,
        overflow: cs.overflow,
        width: cs.width,
        height: cs.height,
        transform: cs.transform
      });
      cur = cur.parentElement;
    }

    const locIntroS = document.querySelector('.loc-intro-s');
    const locIntroSCs = locIntroS ? window.getComputedStyle(locIntroS) : null;
    const grid = locIntroS ? locIntroS.querySelector('.grid') : null;
    const gridCs = grid ? window.getComputedStyle(grid) : null;

    return {
      parents,
      locIntroS: {
        display: locIntroSCs?.display,
        position: locIntroSCs?.position,
        overflow: locIntroSCs?.overflow,
        width: locIntroSCs?.width,
        height: locIntroSCs?.height,
        background: locIntroSCs?.backgroundColor
      },
      grid: {
        display: gridCs?.display,
        gridTemplateColumns: gridCs?.gridTemplateColumns,
        gridTemplateRows: gridCs?.gridTemplateRows,
        width: gridCs?.width,
        height: gridCs?.height
      }
    };
  });

  console.log(JSON.stringify(structure, null, 2));

  await browser.close();
})();
