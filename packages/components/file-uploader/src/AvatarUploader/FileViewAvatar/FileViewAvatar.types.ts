import { type ReactNode } from 'react';

import { type ExtendedFile } from '../../FileUploader.types';

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

export type PreviewableMimeType =
  | 'image/png'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/svg+xml'
  | 'text/csv';
