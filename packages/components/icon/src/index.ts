export { default } from './Icon';
export * from './Icon.types';
export * from './Icon.styles';
export * from './icons/M';
export * from './icons/L';
export * from './icons/colorIcons';
export * from './icons/XL';
// Some of this icons are duplicated in XL folder, consider removing it before uploading new version
export * from './icons/additional';
export { default as MimeTypeIcon } from './MimeTypeIcon/MimeTypeIcon';
export {
  DynamicIcon,
  type DynamicIconProps,
  type DynamicIconName,
} from './DynamicIcon/DynamicIcon';
export {
  useIconComponent,
  useIconComponentState,
  getIconComponent,
  loadIconComponent,
  peekIcon,
  type IconComponent,
  type IconComponentState,
  type IconStatus,
} from './useIconComponent';
export {
  preloadIcons,
  preloadIconSet,
  registerIcons,
  type CachedIcon,
} from './iconLoader';
export type { IconSet } from './icons/iconSets';

export type { MimeTypeIconsProps } from './MimeTypeIcon/MimeTypeIcon.types';
export type { IconProps, IconName } from './Icon.types';
