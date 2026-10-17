const fs = require('fs');
const path = require('path');
const css = fs.readFileSync(path.join(__dirname, '../public/css/era-residence.min.css'), 'utf-8');

function findRules(selector) {
  console.log(`=== Searching for ${selector} in era-residence.min.css ===`);
  const regex = new RegExp(`([^{}]*\\b${selector}\\b[^{}]*)\\{([^}]*)\\}`, 'g');
  let m;
  let count = 0;
  while ((m = regex.exec(css)) !== null && count < 10) {
    console.log(m[1].trim(), '-->', m[2].trim());
    count++;
  }
}

findRules('header-logo');
findRules('header-nav');
findRules('s-bar-w');
findRules('s-down');
findRules('theme_');
