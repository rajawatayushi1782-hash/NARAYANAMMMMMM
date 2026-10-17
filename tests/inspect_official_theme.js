const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectOfficialTheme() {
  console.log('Connecting to official website: https://www.narayanamhotel.com/ ...');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  try {
    await page.goto('https://www.narayanamhotel.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    const themeData = await page.evaluate(() => {
      const getStyles = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        return {
          color: cs.color,
          backgroundColor: cs.backgroundColor,
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          letterSpacing: cs.letterSpacing,
          borderColor: cs.borderColor,
          borderRadius: cs.borderRadius
        };
      };

      // Collect all fonts imported or used
      const fonts = new Set();
      document.querySelectorAll('*').forEach(el => {
        const f = window.getComputedStyle(el).fontFamily;
        if (f) fonts.add(f);
      });

      // Collect dominant colors
      const colors = new Set();
      const bgColors = new Set();
      document.querySelectorAll('h1, h2, h3, h4, p, a, button, nav, header, footer, section').forEach(el => {
        const cs = window.getComputedStyle(el);
        if (cs.color) colors.add(cs.color);
        if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') bgColors.add(cs.backgroundColor);
      });

      return {
        body: getStyles('body'),
        h1: getStyles('h1'),
        h2: getStyles('h2'),
        h3: getStyles('h3'),
        p: getStyles('p'),
        a: getStyles('a'),
        btn: getStyles('button, .btn, .button, a[class*="btn"]'),
        header: getStyles('header, nav, .header, .navbar'),
        footer: getStyles('footer, .footer'),
        allFonts: Array.from(fonts).slice(0, 15),
        sampleColors: Array.from(colors).slice(0, 20),
        sampleBgColors: Array.from(bgColors).slice(0, 20)
      };
    });

    console.log('--- OFFICIAL THEME INSPECTION ---');
    console.log(JSON.stringify(themeData, null, 2));
    fs.writeFileSync(path.join(__dirname, 'official_theme_data.json'), JSON.stringify(themeData, null, 2));

  } catch (err) {
    console.error('Error loading official website:', err.message);
  } finally {
    await browser.close();
  }
}

inspectOfficialTheme().catch(console.error);
