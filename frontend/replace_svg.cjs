const fs = require('fs');

const file = 'c:/lawfirm/frontend/src/pages/Home.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace dark backgrounds to cream
content = content.replace(/#0A1628/g, '#F3EFE6'); // Base SVG bg
content = content.replace(/#15304F/g, '#EBE4D5'); // Pedestal mid
content = content.replace(/#1B3A5C/g, '#D8D2C3'); // Pedestal light
content = content.replace(/#0F2440/g, '#D1C9B6'); // Pedestal dark

// Replace gold accents to royal blue
content = content.replace(/#D4B888/g, '#4A7AFF'); // Light gold to light blue
content = content.replace(/#B8935A/g, '#3A66E5'); // Mid gold to mid blue
content = content.replace(/#8A6A3E/g, '#2B52CC'); // Dark gold to dark blue

fs.writeFileSync(file, content, 'utf8');
console.log('SVG colors replaced!');
