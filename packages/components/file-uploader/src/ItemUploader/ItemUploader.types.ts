import * as React from 'react';
import { FileViewTexts } from '../FileView/FileView.types';

export interface ExtendedFile {
  file: FileWithContent;
  error?: string;
  disabled?: boolean;
  progress?: number;
  success?: boolean;
}

export interface FileWithContent extends File {
  content?: FileContent;
}

export type FileContent = string | ArrayBuffer | null;

type FileUploaderTexts = FileViewTexts & {
  buttonLabel: string | React.ReactNode;
  buttonLabelLarge: string | React.ReactNode;
  buttonDescription: string | React.ReactNode;
};
export interface ItemUploaderProps {
  className?: string;
  mode: 'single' | 'multi';
  filesAmount?: number;
  description?: string;
  disabled?: boolean;
  removable?: boolean;
  tooltip?: string;
  removeTooltip?: string | React.ReactNode;
  label?: string;
  error?: string;
  texts: FileUploaderTexts;
  files: ExtendedFile[];
  accept?: string[];
  onRemove?: (file: FileWithContent, index: number) => void;
  onUpload?: (files: FileWithContent[]) => void;
  retry?: boolean;
}