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

  // Scroll to 14800 where circle is visible
  await page.evaluate(() => window.scrollTo(0, 14800));
  await page.waitForTimeout(800);

  const elementInfo = await page.evaluate(() => {
    // Points on the white circle
    const centerEl = document.elementFromPoint(720, 450);
    const leftEl = document.elementFromPoint(200, 700);
    const topEl = document.elementFromPoint(720, 500);

    function getChain(el) {
      if (!el) return null;
      const chain = [];
      let cur = el;
      while (cur && cur !== document.documentElement) {
        const cs = window.getComputedStyle(cur);
        chain.push({
          tag: cur.tagName,
          class: cur.className,
          id: cur.id,
          bg: cs.backgroundColor,
          borderRadius: cs.borderRadius,
          clipPath: cs.clipPath,
          mask: cs.mask,
          transform: cs.transform,
          rect: cur.getBoundingClientRect(),
          overflow: cs.overflow
        });
        cur = cur.parentElement;
      }
      return chain;
    }

    return {
      centerPoint: getChain(centerEl),
      leftPoint: getChain(leftEl)
    };
  });

  console.log('Circle Element Chain:\n', JSON.stringify(elementInfo, null, 2));

  await browser.close();
})();
