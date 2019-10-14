const fs = require('fs-extra');

const ICON_PATH = './src/icons/';
const files = fs.readdirSync(ICON_PATH);

const renameFun = files.map(i => {
  return fs.rename(`${ICON_PATH + i}`, `${ICON_PATH + i.replace(/^[0-9]+..../g, '')}`, err => {
    if (err) throw err;
  });
});

module.exports = renameFun;
