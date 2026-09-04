import { type ReactNode, type RefObject } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

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
  /**
   * Renders this url as the file's thumbnail instead of the mime-type glyph.
   *
   * For a file already stored elsewhere the consumer usually has its url but not its bytes —
   * remote storage commonly answers without CORS headers, so the browser cannot fetch them back
   * into a `File`. An `<img>` needs no CORS, so passing the url shows the real thumbnail while
   * `file` stays a placeholder carrying just the name.
   *
   * In `FileUploader` pair it with `hideSize`, since a placeholder reports 0 B. `AvatarUploader`
   * and `ItemUploader` render no size at all, so they need nothing extra.
   */
  previewUrl?: string;
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

export type FileUploaderProps = WithHTMLAttributes<
  HTMLDivElement,
  {
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
    hideSize?: boolean;
  }
>;

export type ItemUploaderProps = Omit<FileUploaderProps, 'mode'> & {
  mode: 'single' | 'multi';
};

export type FileUploaderRef = {
  open: () => void;
  inputRef: RefObject<HTMLInputElement>;
  rootRef: RefObject<HTMLElement>;
};
