import { type ReactNode } from 'react';

import { type ExtendedFile } from '../../FileUploader.types';

export type FileViewAvatarTexts = {
  removeTooltip?: ReactNode;
  retryTooltip?: ReactNode;
  buttonLabel?: ReactNode;
  buttonDescription?: ReactNode;
};

export type FileViewAvatarProps = {
  data: ExtendedFile;
  texts?: FileViewAvatarTexts;
  removable?: boolean;
  onRemove?: () => void;
  description?: ReactNode;
};

export type PreviewableMimeType =
  | 'image/png'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/svg+xml'
  | 'text/csv';
