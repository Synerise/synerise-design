import * as medium from './icons';
import * as large from './icons/L';
import * as xLarge from './icons/XL';
import * as additional from './icons/additional';
import * as color from './icons/colorIcons';

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

export { DynamicIcon } from './DynamicIcon/DynamicIcon';

export type { MimeTypeIconsProps } from './MimeTypeIcon/MimeTypeIcon.types';
export type { IconProps } from './Icon.types';
export { medium, large, xLarge, color, additional };
