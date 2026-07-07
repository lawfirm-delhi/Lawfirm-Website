const fs = require('fs');
const path = require('path');

const dir = 'c:/lawfirm/frontend/src/pages/LandingPages';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // A regex to find fadeInUp definitions that are missing `animate: { opacity: 1, y: 0 }`
  const regex = /const fadeInUp = \{([\s\S]*?)whileInView/g;
  
  content = content.replace(regex, (match, p1) => {
    if (!p1.includes('animate:')) {
      return `const fadeInUp = {${p1}animate: { opacity: 1, y: 0 },\n  whileInView`;
    }
    return match;
  });
  
  fs.writeFileSync(filePath, content, 'utf-8');
}

function traverse(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      fixFile(fullPath);
    }
  }
}

traverse(dir);
console.log('Fixed variants!');
