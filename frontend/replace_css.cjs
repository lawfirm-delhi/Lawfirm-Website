const fs = require('fs');

const files = [
  'c:/lawfirm/frontend/src/index.css',
  'c:/lawfirm/frontend/src/pages/LandingPages/Shared/Landing.css'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace gold rgb
  content = content.replace(/rgba\(\s*200\s*,\s*164\s*,\s*106\s*/g, 'rgba(74, 122, 255');
  
  // Replace dark background rgb (nav, etc) to white/cream
  content = content.replace(/rgba\(\s*11\s*,\s*22\s*,\s*40\s*/g, 'rgba(255, 255, 255');
  
  // Replace white borders to dark borders
  content = content.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.1\s*\)/g, 'rgba(11, 29, 69, 0.1)');
  
  // Replace old dark background hex in Landing.css if any
  content = content.replace(/#0B1628/g, '#FCFBF8');
  content = content.replace(/#101C31/g, '#F3EFE6');
  content = content.replace(/#162744/g, '#E8E2D2');

  fs.writeFileSync(file, content, 'utf8');
}
console.log('CSS rgb colors replaced!');
