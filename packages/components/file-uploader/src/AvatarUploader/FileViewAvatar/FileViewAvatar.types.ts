import { ReactNode } from 'react';
import { ExtendedFile } from '../../FileUploader.types';

export interface FileViewAvatarTexts {
  removeTooltip?: ReactNode;
  retryTooltip?: ReactNode;
  buttonLabel?: ReactNode;
  buttonDescription?: ReactNode;
}

export interface FileViewAvatarProps {
  data: ExtendedFile;
  texts?: FileViewAvatarTexts;
  removable?: boolean;
  onRemove?: () => void;
  description?: ReactNode;
}
