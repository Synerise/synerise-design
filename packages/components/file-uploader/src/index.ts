import * as Styles from './FileUploader.styles';
import * as FileViewStyles from './FileView/FileView.styles';
import * as ItemUploaderStyles from './ItemUploader/ItemUploader.styles';
import * as AvatarUploaderStyles from './AvatarUploader/AvatarUploader.styles';

export { default } from './FileUploader';
export type { FileUploaderProps } from './FileUploader.types';

export const FileUploaderStyles = {
  FileUploader: Styles,
  FileView: FileViewStyles,
  ItemUploader: ItemUploaderStyles,
  AvatarUploader: AvatarUploaderStyles,
};
