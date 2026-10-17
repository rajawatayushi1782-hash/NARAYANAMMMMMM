const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

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

  // Find scroll position of loc-intro section
  const pos = await page.evaluate(() => {
    const title = document.querySelector('.loc-intro-s_title');
    if (!title) return 0;
    return title.getBoundingClientRect().top + window.scrollY;
  });
  console.log('loc-intro position:', pos);

  // Scroll to loc-intro
  await page.evaluate((y) => window.scrollTo(0, y - 100), pos);
  await page.waitForTimeout(800);

  // Take initial screenshot of current issue
  await page.screenshot({ path: path.join(__dirname, 'gwalior_investigation_current.png') });
  console.log('Saved gwalior_investigation_current.png');

  // Inspect layout and rects
  const layout = await page.evaluate(() => {
    const section = document.querySelector('.loc-intro-w');
    const grid = document.querySelector('.loc-intro-s .grid');
    const cap = document.querySelector('.loc-intro-s_cap');
    const title = document.querySelector('.loc-intro-s_title');
    const line1 = document.querySelector('.loc-intro-s_title_line.is-1');
    const line2 = document.querySelector('.loc-intro-s_title_line.is-2');
    const line3 = document.querySelector('.loc-intro-s_title_line.is-3');
    const img = document.querySelector('.loc-intro-s_img');

    const csGrid = grid ? window.getComputedStyle(grid) : null;
    const csTitle = title ? window.getComputedStyle(title) : null;
    const csLine2 = line2 ? window.getComputedStyle(line2) : null;
    const csImg = img ? window.getComputedStyle(img) : null;

    return {
      grid: {
        templateColumns: csGrid ? csGrid.gridTemplateColumns : null,
        width: grid ? grid.offsetWidth : 0,
        rect: grid ? grid.getBoundingClientRect() : null
      },
      cap: {
        text: cap ? cap.innerText : null,
        rect: cap ? cap.getBoundingClientRect() : null
      },
      title: {
        gridArea: csTitle ? csTitle.gridArea : null,
        fontSize: csTitle ? csTitle.fontSize : null,
        width: title ? title.offsetWidth : 0,
        rect: title ? title.getBoundingClientRect() : null
      },
      line1: {
        text: line1 ? line1.innerText : null,
        rect: line1 ? line1.getBoundingClientRect() : null
      },
      line2: {
        text: line2 ? line2.innerText : null,
        marginLeft: csLine2 ? csLine2.marginLeft : null,
        rect: line2 ? line2.getBoundingClientRect() : null
      },
      line3: {
        text: line3 ? line3.innerText : null,
        rect: line3 ? line3.getBoundingClientRect() : null
      },
      img: {
        gridArea: csImg ? csImg.gridArea : null,
        width: img ? img.offsetWidth : 0,
        rect: img ? img.getBoundingClientRect() : null
      },
      overlap: {
        line2Right: line2 ? line2.getBoundingClientRect().right : 0,
        imgLeft: img ? img.getBoundingClientRect().left : 0,
        overlapAmount: line2 && img ? line2.getBoundingClientRect().right - img.getBoundingClientRect().left : 0
      }
    };
  });

  console.log('Layout Analysis:\n', JSON.stringify(layout, null, 2));

  await browser.close();
})();
