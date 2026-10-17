const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

html = html.replace(/data-wf-domain="www\.era-residence\.com"/g, 'data-wf-domain="www.narayanamhotel.com"');
html = html.replace(/https:\/\/assets\.era-residence\.com\/open-graph\.mp4/g, '/assets/narayanam/hero/banner-1.webp');

html = html.replace(
  '<img src="/assets/6a1577b00ac578734e61941e_Unreal_20logo.svg" loading="eager" alt="" class="logo b">',
  '<img src="/assets/narayanam/logo/logo.webp" loading="eager" alt="Narayanam Hotel" class="logo b" style="max-height: 48px; width: auto;">'
);

html = html.replace(
  'href="https://www.linkedin.com/company/eraresidenceestepona/?viewAsMember=true"',
  'href="https://www.linkedin.com/"'
);
html = html.replace(
  'href="https://www.facebook.com/era.residence.estepona"',
  'href="https://www.facebook.com/narayanamhotel"'
);
html = html.replace(
  'href="https://www.instagram.com/era.residence.estepona"',
  'href="https://www.instagram.com/narayanamhotel/"'
);

html = html.replace(
  '/assets/6a1576532e78ed7645599d9b_politica_privacidad_era_residence.pdf',
  '#'
);
html = html.replace(
  '/assets/6a1576732e78ed764559c153_terms_of_use_era_residence_20_1_.pdf',
  '#'
);

html = html.replace(
  '<div hover="text" class="h6">Select an Apartment</div>',
  '<div hover="text" class="h6">Rooms &amp; Suites</div>'
);
html = html.replace(
  '<div hover="text" class="h6">Select an Apartment</div>',
  '<div hover="text" class="h6">Rooms &amp; Suites</div>'
);
html = html.replace(
  '<div hover="text" class="h6">Book a call</div>',
  '<div hover="text" class="h6">Book a Stay</div>'
);
html = html.replace(
  '<div hover="text" class="h6">Book a call</div>',
  '<div hover="text" class="h6">Book a Stay</div>'
);

fs.writeFileSync(indexPath, html, 'utf-8');
console.log('Cleaned remaining items in index.html!');
