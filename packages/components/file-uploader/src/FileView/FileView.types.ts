import { type DropzoneRootProps } from 'react-dropzone';

import { type ExtendedFile, type FileViewTexts } from '../FileUploader.types';

export type FileViewProps = {
  data: ExtendedFile;
  texts?: FileViewTexts;
  removable?: boolean;
  onRemove?: () => void;
  retry?: boolean | React.ReactNode;
  retryButtonProps?: DropzoneRootProps;
};
