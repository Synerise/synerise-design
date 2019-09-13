const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const sidebars = require('./sidebars');

const COMPONENTS = __dirname + '/../../packages/components';
const DOCS = __dirname + '/../../packages/docs-site/docs/components';

const newSidebars = sidebars;
const omit = ['core', 'utils'];

glob(COMPONENTS + '/*/README.md', { nodir: true }, function(err, files) {
  files.forEach(file => {
    const dir = path
      .dirname(file)
      .split(path.sep)
      .pop();
    if (!omit.includes(dir)) {
      const destinationFile = path.resolve(DOCS + `/${dir}.md`);
      fs.createFileSync(destinationFile);
      fs.copySync(file, destinationFile);
      newSidebars.docs.Components.push(`components/${dir}`);
    }
  });
  fs.writeFileSync(path.resolve(DOCS, '../../website/sidebars.json'), JSON.stringify(newSidebars), 'utf-8');
});
