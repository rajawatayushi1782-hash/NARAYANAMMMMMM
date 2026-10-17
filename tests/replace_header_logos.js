const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = ['index.html', 'apartments.html', 'contact.html'];
const apartDir = path.join(rootDir, 'apartments_pages');
fs.readdirSync(apartDir).filter(f => f.endsWith('.html')).forEach(f => files.push(path.join('apartments_pages', f)));

const deskSvg = `<svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <path id="circle-desk-logo" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"></path>
  </defs>
  <text fill="currentColor" font-family="'Italiana', 'Cinzel', 'Playfair Display', serif" font-size="7.2" font-weight="600" letter-spacing="2.6px">
    <textPath href="#circle-desk-logo" startOffset="50%" text-anchor="middle">
      NARAYANAM HOTEL • GWALIOR •
    </textPath>
  </text>
</svg>`;

const mobSvg = `<svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <path id="circle-mob-logo" d="M 40,40 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"></path>
  </defs>
  <text fill="currentColor" font-family="'Italiana', 'Cinzel', 'Playfair Display', serif" font-size="4.8" font-weight="600" letter-spacing="1.8px">
    <textPath href="#circle-mob-logo" startOffset="50%" text-anchor="middle">
      NARAYANAM HOTEL • GWALIOR •
    </textPath>
  </text>
</svg>`;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // Replace desktop header-logo_bg
  html = html.replace(
    /<div class="header-logo_bg b-desk w-embed"><svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg><\/div>/g,
    `<div class="header-logo_bg b-desk w-embed">${deskSvg}</div>`
  );

  // Replace mobile header-logo_bg
  html = html.replace(
    /<div class="header-logo_bg b-mob w-embed"><svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg><\/div>/g,
    `<div class="header-logo_bg b-mob w-embed">${mobSvg}</div>`
  );

  fs.writeFileSync(filePath, html, 'utf-8');
});

console.log('Successfully replaced circular header logos across all ' + files.length + ' files!');
