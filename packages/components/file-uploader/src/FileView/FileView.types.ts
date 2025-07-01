import { type ReactNode } from 'react';
import { type DropzoneRootProps } from 'react-dropzone';

import { type ExtendedFile } from '../FileUploader.types';

export interface FileViewTexts {
  size?: ReactNode;
  cancelText?: ReactNode;
  removeTooltip?: ReactNode;
  okText?: ReactNode;
  removeConfirmTitle?: ReactNode;
  fileWeight?: ReactNode;
  percent?: number;
  buttonLabel?: ReactNode;
  buttonDescription?: ReactNode;
  retryLabel?: ReactNode;
}

export interface FileViewProps {
  data: ExtendedFile;
  texts: FileViewTexts;
  removable?: boolean;
  onRemove?: () => void;
  retry?: boolean | React.ReactNode;
  retryButtonProps?: DropzoneRootProps;
}
