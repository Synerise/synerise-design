import * as medium from './icons';
import * as large from './icons/L';
import * as xLarge from './icons/XL';
import * as color from './icons/colorIcons';
import * as additional from './icons/additional';

export { default } from './Icon';
export * from './Icon.types';
export * from './Icon.styles';
export * from './icons';
export * from './icons/L';
export * from './icons/colorIcons';
export * from './icons/XL';
// Some of this icons are duplicated in XL folder, consider removing it before uploading new version
export * from './icons/additional';
export { default as MimeTypeIcon } from './MimeTypeIcon/MimeTypeIcon';

export type { MimeTypeIconsProps } from './MimeTypeIcon/MimeTypeIcon.types';
export type { IconProps } from './Icon.types';
export { medium, large, xLarge, color, additional };
