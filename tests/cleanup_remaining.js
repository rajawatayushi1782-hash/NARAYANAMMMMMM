const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = ['index.html', 'apartments.html', 'contact.html'];
const apartDir = path.join(rootDir, 'apartments_pages');
fs.readdirSync(apartDir).filter(f => f.endsWith('.html')).forEach(f => files.push(path.join('apartments_pages', f)));

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // Schema & WebPage
  html = html.replace(/"name": "Apartments — ERA Residence Estepona"/g, '"name": "Luxury Rooms & Suites — Narayanam Hotel Gwalior"');
  html = html.replace(/"name": "Contact — ERA Residence"/g, '"name": "Contact & Reservations — Narayanam Hotel Gwalior"');
  html = html.replace(/Explore ground floor residences, duplexes and penthouses designed for contemporary Mediterranean living on Costa del Sol\./g, 'Explore our luxurious Royal Suites with Jacuzzi, Premium Suites, Executive Rooms, and Deluxe accommodations at Narayanam Hotel, Morar, Gwalior.');

  // Preloader aria-labels
  html = html.replace(/aria-label="EraResidence"/g, 'aria-label="NarayanamHotel"');
  html = html.replace(/aria-label="Estepona"/g, 'aria-label="Heritage & Comfort"');
  html = html.replace(/aria-label="Era ResidenceA place to return to\."/g, 'aria-label="Narayanam Hotel Experience Royal Comfort & Luxury."');

  // Any remaining Era Residence mentions
  html = html.replace(/Era Residence feel closer to a group of private homes than a standard apartment complex/g, 'Narayanam Hotel feel closer to a warm royal sanctuary than a standard commercial property');
  html = html.replace(/Era Residence feel closer to a group of private homes than a standard/g, 'Narayanam Hotel feel closer to a warm royal sanctuary than a standard');
  html = html.replace(/Era Residence\./g, 'Narayanam Hotel.');
  html = html.replace(/Era Residence/g, 'Narayanam Hotel');
  html = html.replace(/ERA Residence/g, 'Narayanam Hotel');

  // Any remaining Costa del Sol / Estepona mentions in text
  html = html.replace(/A boutique gated community of 25 residences on Costa del Sol, designed around privacy,wellbeing and timeless Mediterranean living\./g, 'A premier boutique hotel of luxury rooms and suites in Morar, Gwalior, designed around regal hospitality, pure dining, and unmatched comfort.');
  html = html.replace(/Costa del Sol/g, 'Gwalior');
  html = html.replace(/Estepona, Málaga, Spain/g, 'Morar, Gwalior (M.P.), India');
  html = html.replace(/Estepona/g, 'Morar, Gwalior');
  html = html.replace(/Málaga/g, 'Madhya Pradesh');

  fs.writeFileSync(filePath, html, 'utf-8');
});

console.log('Cleanup script executed across all ' + files.length + ' files successfully.');
