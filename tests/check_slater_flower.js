const fs = require('fs');

const slater = fs.readFileSync('public/js/slater.js', 'utf-8');
console.log('Includes ctn-down:', slater.includes('ctn-down'));
console.log('Includes flower:', slater.includes('flower'));
console.log('Includes loc-info:', slater.includes('loc-info'));
console.log('Includes bougainvillea:', slater.includes('bougainvillea'));
