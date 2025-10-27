const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function scanDirectory(dirPath) {
  const children = [];
  
  const items = await readdir(dirPath);
  for (const item of items) {
    const ignore = [".git", "node_modules", ".gitignore", ".nojekyll", "package.json", "package-lock.json", "404.html", "main.js", "LICENSE", "README.md"];
    if (ignore.includes(item)) continue;

    const fullPath = path.join(dirPath, item);
    const stats = await stat(fullPath);
    
    const node = {
      name: item,
      path: path.relative(process.cwd(), fullPath),
      type: stats.isDirectory() ? 'directory' : 'file',
      children: []
    };

    if (stats.isDirectory()) {
      node.children = await scanDirectory(fullPath);
    }

    children.push(node);
  }
  
  return children;
}

scanDirectory(process.cwd())
  .then(data => {
    fs.writeFileSync('index.json', JSON.stringify(data, null, 2));
    console.log('The scan is complete and the index file has been automatically generated!');
  })
  .catch(err => console.error('Scan error:', err));