const fs = require('fs');

const css = fs.readFileSync('public/css/era-residence.min.css', 'utf-8');
const match = css.match(/html\{[^}]*\}/);
console.log('html rule:', match ? match[0] : 'not found');

const fontMatch = css.match(/font-size:[^;]*rem/g);
console.log('sample font rem:', fontMatch ? fontMatch.slice(0, 10) : 'none');
