const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

glob('./src/**/*.less', { nodir: true }, function(er, files) {
  files.forEach(file => {
    const destinationFile = path.resolve('./dist', path.relative('./src', file));
    fs.createFileSync(destinationFile);
    fs.copySync(file, destinationFile);
  });
});
