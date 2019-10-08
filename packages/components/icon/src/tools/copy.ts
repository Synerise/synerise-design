import { copy } from 'fs-extra';

const ICON_PATH = './icons/';
const ICON_PATH_DIST = './dist/icons';

const copyFun = () => {
  return copy(ICON_PATH, ICON_PATH_DIST, err => {
    if (err) throw err;
  });
};

module.exports = copyFun();
