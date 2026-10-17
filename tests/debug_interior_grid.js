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

  const debug = await page.evaluate(() => {
    const title = document.querySelector('.interior-s_title');
    const grid = title.parentElement;
    const h2 = title.querySelector('h2');
    const h3 = title.querySelector('h3');
    const section = title.closest('section');

    const csGrid = window.getComputedStyle(grid);
    const csTitle = window.getComputedStyle(title);
    const csH2 = window.getComputedStyle(h2);
    const csH3 = window.getComputedStyle(h3);
    const csSection = window.getComputedStyle(section);

    return {
      grid: {
        display: csGrid.display,
        gridTemplateColumns: csGrid.gridTemplateColumns,
        width: csGrid.width,
        rect: grid.getBoundingClientRect()
      },
      title: {
        display: csTitle.display,
        gridColumn: csTitle.gridColumn,
        gridArea: csTitle.gridArea,
        width: csTitle.width,
        maxWidth: csTitle.maxWidth,
        margin: csTitle.margin,
        rect: title.getBoundingClientRect()
      },
      h2: {
        fontSize: csH2.fontSize,
        lineHeight: csH2.lineHeight,
        textAlign: csH2.textAlign,
        rect: h2.getBoundingClientRect()
      },
      h3: {
        fontSize: csH3.fontSize,
        transform: csH3.transform,
        rect: h3.getBoundingClientRect()
      },
      section: {
        width: csSection.width,
        borderRadius: csSection.borderRadius,
        borderTopLeftRadius: csSection.borderTopLeftRadius,
        borderTopRightRadius: csSection.borderTopRightRadius,
        rect: section.getBoundingClientRect()
      }
    };
  });

  console.log('Interior Title Debug:', JSON.stringify(debug, null, 2));

  await browser.close();
})();
