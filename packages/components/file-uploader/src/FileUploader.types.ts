import { type ReactNode, type RefObject } from 'react';

export type FileViewTexts = {
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
};

export type ExtendedFile = {
  file: FileWithContent;
  error?: string;
  disabled?: boolean;
  progress?: number;
  success?: boolean;
};

export type FileWithContent = File & {
  content?: FileContent;
};

export type FileContent = string | ArrayBuffer | null;

type FileUploaderTexts = FileViewTexts & {
  buttonLabel?: ReactNode;
  buttonLabelLarge?: ReactNode;
  buttonDescription?: ReactNode;
};

export type FileUploaderProps = {
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
};

export type ItemUploaderProps = Omit<FileUploaderProps, 'mode'> & {
  mode: 'single' | 'multi';
};

export type FileUploaderRef = {
  open: () => void;
  inputRef: RefObject<HTMLInputElement>;
  rootRef: RefObject<HTMLElement>;
};
