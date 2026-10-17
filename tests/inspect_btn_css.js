const fs = require('fs');
const css = fs.readFileSync('public/css/era-residence.min.css', 'utf-8');

['.theme_on-light', '.theme_on-dark', '.theme_on-brand', '.theme_on-color'].forEach(t => {
  const idx = css.indexOf(t + '{');
  if (idx !== -1) {
    console.log('=== ' + t + ' ===');
    console.log(css.substring(idx, idx + 800));
  }
});
