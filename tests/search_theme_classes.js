const fs = require('fs');

function searchTheme(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  const matches = content.match(/theme_on[a-zA-Z0-9_-]*/g);
  console.log(filename, [...new Set(matches)]);
}

searchTheme('index.html');
searchTheme('apartments.html');
searchTheme('contact.html');
