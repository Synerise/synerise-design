const fs = require('fs-extra');

const ICON_PATH = './src/icons/';
const ICON_PATH_DIST = './dist/icons';

const copyFun = () => {
  return fs.copy(ICON_PATH, ICON_PATH_DIST, err => {
    if (err) throw err;
  });
};

module.exports = copyFun();
