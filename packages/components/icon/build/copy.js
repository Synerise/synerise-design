const fs = require('fs-extra');

const ICON_PATH = './src/svg/';
const ICON_PATH_DIST = './dist/svg';
const OPTIONS = {
  filter: file => !/\.ts$/.exec(file),
};

const copyFun = () => {
  return fs.copy(ICON_PATH, ICON_PATH_DIST, OPTIONS, err => {
    if (err) throw err;
  });
};

module.exports = copyFun();
