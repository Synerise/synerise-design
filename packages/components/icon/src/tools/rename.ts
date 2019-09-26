import { readdirSync, rename } from 'fs';

const files = readdirSync('./icon-components/');

const ICON_PATH = './icon-components/';

const renameFun = files.map(i => {
  return rename(`${ICON_PATH + i}`, `${ICON_PATH + i.replace(/[0-9]/g, '')}`, err => {
    if (err) throw err;
  });
});

module.exports = renameFun;
