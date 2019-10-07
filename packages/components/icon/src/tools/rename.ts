import { readdirSync, rename, copy } from 'fs-extra';

const ICON_PATH = './icons/';
const ICON_PATH_DIST = './dist/icons';

const files = readdirSync(ICON_PATH);

const renameFun = files.map(i => {
  return rename(`${ICON_PATH + i}`, `${ICON_PATH + i.replace(/[^-]*-(.+)[0-9]+./g, '')}`, err => {
    if (err) throw err;
    return copy(ICON_PATH, ICON_PATH_DIST);
  });
});

module.exports = renameFun;
