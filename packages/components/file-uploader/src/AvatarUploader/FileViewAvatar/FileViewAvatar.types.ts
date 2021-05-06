import * as React from 'react';
import { ExtendedFile } from '../../FileUploader.types';

export interface FileViewAvatarTexts {
  removeTooltip?: string | React.ReactNode;
  retryTooltip?: string | React.ReactNode;
  buttonLabel: string | React.ReactNode;
  buttonDescription: string | React.ReactNode;
}

export interface FileViewAvatarProps {
  data: ExtendedFile;
  texts: FileViewAvatarTexts;
  removable?: boolean;
  onRemove?: () => void;
  description?: string | React.ReactNode;
}