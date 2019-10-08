import { readdirSync, rename } from 'fs-extra';

const ICON_PATH = './icons/';
const files = readdirSync(ICON_PATH);

const renameFun = files.map(i => {
  return rename(`${ICON_PATH + i}`, `${ICON_PATH + i.replace(/[^-]*-(.+)[0-9]+./g, '')}`, err => {
    if (err) throw err;
  });
});

module.exports = renameFun;
