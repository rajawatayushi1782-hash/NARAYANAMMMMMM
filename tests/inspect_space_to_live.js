const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

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

  // Find the element with "The Space To" or "Live in"
  const sectionInfo = await page.evaluate(() => {
    const heading = document.querySelector('.interior_heading_h1') || document.querySelector('.interior-s_title');
    if (!heading) return { found: false };

    const section = heading.closest('section');
    const container = heading.closest('.container');
    const interiorW = heading.closest('.interior-w');
    const interiorS = heading.closest('.interior-s');

    // Get previous sibling or parent elements to see background photos and masks
    let prev = section ? section.previousElementSibling : null;
    const prevInfo = prev ? {
      tag: prev.tagName,
      class: prev.className,
      rect: prev.getBoundingClientRect()
    } : null;

    return {
      found: true,
      headingRect: heading.getBoundingClientRect(),
      headingText: heading.innerText,
      sectionRect: section ? section.getBoundingClientRect() : null,
      sectionClass: section ? section.className : null,
      sectionBg: section ? window.getComputedStyle(section).backgroundColor : null,
      sectionBorderRadius: section ? window.getComputedStyle(section).borderRadius : null,
      prevInfo,
      scrollY: window.scrollY
    };
  });

  console.log('Section Info:', JSON.stringify(sectionInfo, null, 2));

  // Let's scroll so heading is near top/center
  const outDir = path.join(__dirname, 'space_to_live_investigation');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Find scroll position where this section enters and animates
  const headingTop = await page.evaluate(() => {
    const h = document.querySelector('.interior-s_title') || document.querySelector('.interior-w');
    if (!h) return 0;
    const r = h.getBoundingClientRect();
    return r.top + window.scrollY;
  });

  console.log('Heading absolute top:', headingTop);

  // Capture before, during, and at the section
  const scrollTargets = [
    Math.max(0, headingTop - 1200),
    Math.max(0, headingTop - 600),
    Math.max(0, headingTop - 300),
    headingTop,
    headingTop + 300
  ];

  for (let i = 0; i < scrollTargets.length; i++) {
    const y = scrollTargets[i];
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, `scroll_${i}_y${Math.round(y)}.png`) });
    console.log(`Captured scroll_${i}_y${Math.round(y)}.png`);
  }

  await browser.close();
})();
