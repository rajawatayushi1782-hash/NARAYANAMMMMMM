const fs = require('fs');

const css = fs.readFileSync('public/css/era-residence.min.css', 'utf-8');
const regex = /([^{}]*flower[^{}]*)\{([^}]*)\}/g;
let m;
while ((m = regex.exec(css)) !== null) {
  console.log(m[1].trim(), '-->', m[2].trim().slice(0, 100));
}
