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

  // Scroll to 6000
  await page.evaluate(() => window.scrollTo(0, 6000));
  await page.waitForTimeout(1000);

  const report = await page.evaluate(() => {
    function getFullInfo(selector) {
      const el = document.querySelector(selector);
      if (!el) return { selector, found: false };
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      
      // also check ancestors up to 5 levels
      const ancestors = [];
      let curr = el.parentElement;
      while (curr && curr !== document.body && ancestors.length < 5) {
        const c = window.getComputedStyle(curr);
        ancestors.push({
          tag: curr.tagName,
          className: curr.className,
          id: curr.id,
          bg: c.backgroundColor,
          bgImage: c.backgroundImage,
          rect: { x: curr.getBoundingClientRect().x, y: curr.getBoundingClientRect().y, w: curr.getBoundingClientRect().width, h: curr.getBoundingClientRect().height }
        });
        curr = curr.parentElement;
      }

      // Check children
      const children = Array.from(el.querySelectorAll('*')).map(child => {
        const c = window.getComputedStyle(child);
        return {
          tag: child.tagName,
          className: child.className,
          bg: c.backgroundColor,
          bgImage: c.backgroundImage,
          color: c.color,
          rect: { x: child.getBoundingClientRect().x, y: child.getBoundingClientRect().y, w: child.getBoundingClientRect().width, h: child.getBoundingClientRect().height }
        };
      });

      return {
        selector,
        found: true,
        tag: el.tagName,
        className: el.className,
        id: el.id,
        bg: cs.backgroundColor,
        bgImage: cs.backgroundImage,
        boxShadow: cs.boxShadow,
        rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
        ancestors,
        children
      };
    }

    // Inspect the exact positions from the screenshot
    // Top-left logo: ~ x: 80, y: 80
    // Top-right nav: ~ x: 1200-1400, y: 50-150
    // Left progress / page number: ~ x: 50-120, y: 300-500
    // Left scroll / arrow: ~ x: 50-120, y: 800-900

    const elAtLogo = document.elementFromPoint(70, 70);
    const elAtNav = document.elementFromPoint(1350, 100);
    const elAtPageNum = document.elementFromPoint(73, 425);
    const elAtScroll = document.elementFromPoint(73, 850);

    return {
      elAtLogo: elAtLogo ? { tag: elAtLogo.tagName, class: elAtLogo.className, id: elAtLogo.id } : null,
      elAtNav: elAtNav ? { tag: elAtNav.tagName, class: elAtNav.className, id: elAtNav.id } : null,
      elAtPageNum: elAtPageNum ? { tag: elAtPageNum.tagName, class: elAtPageNum.className, id: elAtPageNum.id } : null,
      elAtScroll: elAtScroll ? { tag: elAtScroll.tagName, class: elAtScroll.className, id: elAtScroll.id } : null,

      logoReport: getFullInfo('.header-logo') || getFullInfo('.logo_symbol'),
      headerReport: getFullInfo('.header') || getFullInfo('header'),
      navReport: getFullInfo('.nav') || getFullInfo('.header_nav') || getFullInfo('.header-nav') || getFullInfo('.nav-links'),
      scrollReport: getFullInfo('.s-bar') || getFullInfo('.scroll') || getFullInfo('.scroll-bar') || getFullInfo('.s_scroll'),
      
      // Let's also find all elements on screen at scrollY=6000 with white or near white background
      allWhiteElements: Array.from(document.querySelectorAll('*')).filter(el => {
        const c = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        // Visible on screen
        if (rect.width === 0 || rect.height === 0) return false;
        if (rect.bottom < 0 || rect.top > 900 || rect.right < 0 || rect.left > 1440) return false;
        const bg = c.backgroundColor;
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (m) {
          const r = parseInt(m[1]), g = parseInt(m[2]), b = parseInt(m[3]), a = m[4] !== undefined ? parseFloat(m[4]) : 1;
          if (r > 250 && g > 250 && b > 250 && a > 0.5) {
            return true;
          }
        }
        return false;
      }).map(el => {
        const c = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: el.className,
          id: el.id,
          bg: c.backgroundColor,
          rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
          outerHtmlPrefix: el.outerHTML.slice(0, 100)
        };
      })
    };
  });

  console.log('Detailed 6000 report:\n', JSON.stringify(report, null, 2));

  await browser.close();
})();
