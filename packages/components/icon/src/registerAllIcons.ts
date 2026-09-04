import { registerIcons } from './iconLoader';
import * as large from './icons/L';
import * as medium from './icons/M';
import * as xlarge from './icons/XL';
import * as additional from './icons/additional';
import * as color from './icons/colorIcons';

/**
 * Side-effect entry point that registers every icon eagerly, making `<Icon iconName="..." />`
 * resolve synchronously — including during server-side rendering.
 *
 * Import it once from an application entry file:
 *
 * ```ts
 * import '@synerise/ds-icon/dist/registerAllIcons';
 * ```
 *
 * This opts out of code splitting: the whole icon set (~390 kB gzipped) lands in the bundle that
 * imports it. Reach for it only when icons must be present in server-rendered HTML or on the very
 * first paint; otherwise let `iconName` load its set on demand.
 */
registerIcons(medium);
registerIcons(large);
registerIcons(xlarge);
registerIcons(additional);
registerIcons(color);
