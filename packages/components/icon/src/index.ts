export {
  DynamicIcon,
  type DynamicIconName,
  type DynamicIconProps,
} from './DynamicIcon/DynamicIcon';
export { default } from './Icon';
export * from './Icon.styles';
export type { IconName, IconProps } from './Icon.types';
export * from './Icon.types';
export {
  type CachedIcon,
  preloadIconSet,
  preloadIcons,
  registerIcons,
} from './iconLoader';
// Some of this icons are duplicated in XL folder, consider removing it before uploading new version
export * from './icons/additional';
export * from './icons/colorIcons';
export type { IconSet } from './icons/iconSets';
export * from './icons/L';
export * from './icons/M';
export * from './icons/XL';
export { default as MimeTypeIcon } from './MimeTypeIcon/MimeTypeIcon';
export type { MimeTypeIconsProps } from './MimeTypeIcon/MimeTypeIcon.types';
export {
  getIconComponent,
  type IconComponent,
  type IconComponentState,
  type IconStatus,
  loadIconComponent,
  peekIcon,
  useIconComponent,
  useIconComponentState,
} from './useIconComponent';
