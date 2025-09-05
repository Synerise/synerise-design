import * as AvatarUploaderStyles from './AvatarUploader/AvatarUploader.styles';
import * as Styles from './FileUploader.styles';
import * as FileViewStyles from './FileView/FileView.styles';
import * as ItemUploaderStyles from './ItemUploader/ItemUploader.styles';

export { default } from './FileUploader';
export { default as AvatarUploader } from './AvatarUploader/AvatarUploader';
export { default as ItemUploader } from './ItemUploader/ItemUploader';

export type { ItemUploaderProps } from './ItemUploader/ItemUploader.types';
export type {
  FileUploaderProps,
  ExtendedFile,
  FileWithContent,
  FileUploaderRef,
  FileContent,
} from './FileUploader.types';

export const FileUploaderStyles = {
  FileUploader: Styles,
  FileView: FileViewStyles,
  ItemUploader: ItemUploaderStyles,
  AvatarUploader: AvatarUploaderStyles,
};
