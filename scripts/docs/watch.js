const chokidar = require('chokidar');
const path = require('path');
const copyFileToDocs = require('./componentmd');

const target = path.join(__dirname, '../../packages/components/*/README.md');
console.log('Waiting for README.md files changes....');
console.log(target);
chokidar.watch(target).on('change', path => {
  console.log(path);
  path.includes('README.md') && copyFileToDocs(path);
});
