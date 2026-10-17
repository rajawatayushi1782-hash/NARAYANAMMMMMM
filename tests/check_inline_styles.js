const fs = require('fs');

function checkInlineTheme(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  const styleMatches = content.match(/<style[\s\S]*?<\/style>/gi) || [];
  console.log(`=== ${filename} has ${styleMatches.length} style tags ===`);
  styleMatches.forEach((style, idx) => {
    if (style.includes('theme_on') || style.includes('header-logo') || style.includes('header-nav') || style.includes('s-bar')) {
      console.log(`Style tag #${idx}:`, style.slice(0, 300));
    }
  });
}

checkInlineTheme('index.html');
checkInlineTheme('apartments.html');
