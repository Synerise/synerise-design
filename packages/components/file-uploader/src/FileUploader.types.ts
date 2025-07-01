import { type ReactNode } from 'react';

import { type FileViewTexts } from './FileView/FileView.types';

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
  buttonLabel?: ReactNode;
  buttonLabelLarge?: ReactNode;
  buttonDescription?: ReactNode;
};

export interface FileUploaderProps {
  className?: string;
  mode: 'single' | 'multi-medium' | 'multi-large';
  filesAmount?: number;
  description?: string;
  disabled?: boolean;
  removable?: boolean;
  tooltip?: string;
  removeTooltip?: ReactNode;
  label?: string;
  error?: string;
  texts?: FileUploaderTexts;
  files: ExtendedFile[];
  accept?: string[];
  onRemove?: (file: FileWithContent, index: number) => void;
  onUpload?: (files: FileWithContent[]) => void;
  retry?: boolean;
}

export type ItemUploaderProps = Omit<FileUploaderProps, 'mode'> & {
  mode: 'single' | 'multi';
};
