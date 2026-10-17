const fs = require('fs');

function checkAllHeaderLogo(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  const matches = content.match(/class="[^"]*header-logo[^"]*"/g) || [];
  console.log(filename, matches);
}

checkAllHeaderLogo('index.html');
checkAllHeaderLogo('apartments.html');
checkAllHeaderLogo('contact.html');
