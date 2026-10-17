const fs = require('fs');
const css = fs.readFileSync('public/css/era-residence.min.css', 'utf-8');

const regex = /--_global-colors---[a-zA-Z0-9\-_]+:[^;]+;/g;
const vars = new Set();
let m;
while ((m = regex.exec(css)) !== null) {
  vars.add(m[0]);
}

console.log('=== GLOBAL COLOR VARIABLES DEFINED ===');
vars.forEach(v => console.log(v));
