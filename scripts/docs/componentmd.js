const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const sidebars = require('./sidebars');

const COMPONENTS = __dirname + '/../../packages/components';
const DOCS = __dirname + '/../../packages/docs-site/docs/components';

const newSidebars = sidebars;
const omit = ['core', 'utils'];

const copyFileToDocs = (file, cb) => {
  const dir = path
    .dirname(file)
    .split(path.sep)
    .pop();
  if (!omit.includes(dir)) {
    const destinationFile = path.resolve(DOCS + `/${dir}.md`);
    fs.createFileSync(destinationFile);
    fs.copySync(file, destinationFile);
    cb && cb(dir);
  }
};

module.exports = copyFileToDocs;

glob(COMPONENTS + '/*/README.md', { nodir: true }, function(err, files) {
  files.forEach(file => {
    copyFileToDocs(file, dir => {
      newSidebars.docs.Components.push(`components/${dir}`);
    });
  });
  fs.writeFileSync(path.resolve(DOCS, '../../website/sidebars.json'), JSON.stringify(newSidebars), 'utf-8');
});
