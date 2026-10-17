const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const sections = html.match(/<section[^>]*>/g) || [];
sections.forEach(s => console.log(s));
