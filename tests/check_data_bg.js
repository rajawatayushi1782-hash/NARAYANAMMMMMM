const fs = require('fs');

function checkDataBg(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  const matches = content.match(/data-bg="[^"]*"/g) || [];
  console.log(filename, matches);
}

checkDataBg('index.html');
checkDataBg('apartments.html');
checkDataBg('contact.html');
