import * as React from 'react';
import { ExtendedFile } from '../FileUploader.types';

export interface FileViewTexts {
  size: string | React.ReactNode;
  uploading: string | React.ReactNode;
  removeTooltip?: string | React.ReactNode;
}

export interface FileViewProps {
  data: ExtendedFile;
  texts: FileViewTexts;
  removable?: boolean;
  onRemove?: () => void;
}