const fs = require('fs-extra');

const ICON_PATH_DIST = './dist/svg';
const OPTIONS = {
  filter: file => !/\.ts$/.exec(file),
};

const removeFn = () => {
  return fs.remove(ICON_PATH_DIST, OPTIONS, err => {
    if (err) throw err;
  });
};

module.exports = removeFn();
