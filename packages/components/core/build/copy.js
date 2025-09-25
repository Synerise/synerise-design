const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

glob('./src/**/*.{less,json}', { nodir: true }).then((files) => {
  files.forEach(file => {
    const destinationFile = path.resolve('./dist', path.relative('./src', file));
    fs.createFileSync(destinationFile);
    fs.copySync(file, destinationFile);
  });
});
