const fs = require('fs');

const css = fs.readFileSync('public/css/era-residence.min.css', 'utf-8');
const regex = /([^{}]*section\.arch[^{}]*)\{([^}]*)\}/g;
let m;
while ((m = regex.exec(css)) !== null) {
  console.log(m[1].trim(), '-->', m[2].trim());
}

const themeCss = fs.readFileSync('public/css/narayanam-theme.css', 'utf-8');
const regexTheme = /([^{}]*interior[^{}]*)\{([^}]*)\}/g;
while ((m = regexTheme.exec(themeCss)) !== null) {
  console.log('themeCss:', m[1].trim(), '-->', m[2].trim());
}

const regexArch = /([^{}]*arch[^{}]*)\{([^}]*)\}/g;
while ((m = regexArch.exec(themeCss)) !== null) {
  console.log('themeCss arch:', m[1].trim(), '-->', m[2].trim());
}
