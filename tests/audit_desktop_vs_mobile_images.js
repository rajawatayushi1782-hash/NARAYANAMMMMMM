const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fs = require('fs');
const path = require('path');

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
];

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const report = {};

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.addInitScript(() => {
      sessionStorage.setItem('hasVisited', 'true');
      localStorage.setItem('cookies', 'accepted');
    });

    const requests = [];
    page.on('request', req => {
      const url = req.url();
      if (url.match(/\.(png|jpg|jpeg|webp|avif|svg|gif)/i)) {
        requests.push(url);
      }
    });

    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const p = document.querySelector('[data-preloader]');
      if (p) p.style.display = 'none';
    });
    await page.waitForTimeout(1000);

    // Scroll through the entire page slowly to trigger lazy loading / ScrollTrigger
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    for (let y = 0; y <= maxScroll; y += 400) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await page.waitForTimeout(30);
    }
    await page.waitForTimeout(1000);

    // Audit all images on the page
    const elements = await page.evaluate(() => {
      const items = [];

      // 1. All img elements
      document.querySelectorAll('img').forEach((img, i) => {
        const rect = img.getBoundingClientRect();
        const cs = window.getComputedStyle(img);
        const parent = img.closest('section, [class*="section"], [class*="-s"], [class*="-w"]') || img.parentElement;
        items.push({
          type: 'img',
          index: i,
          parentClass: parent ? parent.className : '',
          parentTag: parent ? parent.tagName : '',
          src: img.getAttribute('src'),
          currentSrc: img.currentSrc,
          srcset: img.getAttribute('srcset'),
          alt: img.getAttribute('alt'),
          loading: img.getAttribute('loading'),
          display: cs.display,
          visible: cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0'
        });
      });

      // 2. All elements with CSS background-image
      document.querySelectorAll('*').forEach((el, i) => {
        const cs = window.getComputedStyle(el);
        const bg = cs.backgroundImage;
        if (bg && bg !== 'none' && !bg.includes('gradient')) {
          const parent = el.closest('section, [class*="section"]') || el.parentElement;
          items.push({
            type: 'bg',
            tag: el.tagName,
            className: el.className,
            parentClass: parent ? parent.className : '',
            backgroundImage: bg
          });
        }
      });

      // 3. Three.js textures if exposed on window or canvas
      const canvases = [];
      document.querySelectorAll('canvas').forEach((c, i) => {
        canvases.push({
          index: i,
          width: c.width,
          height: c.height,
          className: c.className
        });
      });

      return { items, canvases };
    });

    // Filter items that have era or residence or old asset hashes
    const eraImages = elements.items.filter(item => {
      const s = JSON.stringify(item);
      return s.includes('era-residence') || s.includes('6a15') || s.includes('6a0f') || s.includes('6a25') || s.includes('6a34') || s.includes('6a54') || s.includes('6a38');
    });

    const eraRequests = requests.filter(url => {
      return url.includes('era-residence') || url.includes('6a15') || url.includes('6a0f') || url.includes('6a25') || url.includes('6a34') || url.includes('6a54') || url.includes('6a38');
    });

    report[vp.name] = {
      totalImagesFound: elements.items.length,
      eraImagesInDom: eraImages,
      eraRequestsCount: eraRequests.length,
      eraRequests: [...new Set(eraRequests)],
      allImages: elements.items
    };

    console.log(`\n================== ${vp.name.toUpperCase()} ==================`);
    console.log(`Total images inspected: ${elements.items.length}`);
    console.log(`ERA Residence images in DOM: ${eraImages.length}`);
    console.log(`ERA Residence network requests: ${eraRequests.length}`);

    await page.close();
  }

  fs.writeFileSync(path.join(__dirname, 'audit_report.json'), JSON.stringify(report, null, 2));
  console.log('Saved audit_report.json');

  await browser.close();
})();
