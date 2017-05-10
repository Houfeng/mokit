const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

fs.writeFileSync(path.resolve(__dirname, '../info.json'), JSON.stringify({
  name: pkg.name,
  version: pkg.version
}));