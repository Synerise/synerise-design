const fs = require('fs-extra');

const ICON_PATH = './src/svg/';
const ICON_PATH_DIST = `./dist/${process.env.BUILD_TYPE}/svg`;
console.log('copy',{ICON_PATH_DIST})
const OPTIONS = {
  filter: file => !/\.ts$/.exec(file),
};

const copyFun = () => {
  return fs.copy(ICON_PATH, ICON_PATH_DIST, OPTIONS, err => {
    if (err) throw err;
  });
};

module.exports = copyFun();
