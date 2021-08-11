const fs = require('fs-extra');

const ICON_PATH_DIST = `./dist/${process.env.BUILD_TYPE}/svg`;
console.log("CLEANUP", ICON_PATH_DIST)
const OPTIONS = {
  filter: file => !/\.ts$/.exec(file),
};

const removeFn = () => {
  return fs.remove(ICON_PATH_DIST, OPTIONS, err => {
    if (err) throw err;
  });
};

module.exports = removeFn();
