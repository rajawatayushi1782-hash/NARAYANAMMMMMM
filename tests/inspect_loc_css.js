const fs = require('fs');
const css = fs.readFileSync('public/css/era-residence.min.css', 'utf-8');

['loc-w', 'loc-w_bg', 'loc-w_clouds', 'loc-w_decor'].forEach(cls => {
  const idx = css.indexOf('.' + cls + '{');
  if (idx !== -1) {
    console.log(css.substring(idx, idx + 250));
  } else {
    console.log(cls + ' not found with exact selector');
  }
});
