// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as packageJson from '../package.json';

const packageVersion = packageJson.version;

export { default } from './Button';
export { packageVersion };
