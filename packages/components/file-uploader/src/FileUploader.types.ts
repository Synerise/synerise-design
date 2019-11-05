import { FileViewTexts } from './FileView/FileView';

export interface ExtendedFile {
  file: File;
  error?: string;
  disabled?: boolean;
  progress?: number;
}

export interface FileUploaderProps {
  mode: 'single' | 'multi';
  description?: string;
  disabled?: boolean;
  removable?: boolean;
  infoTooltip?: string;
  label?: string;
  error?: string;
  files: ExtendedFile[];
  accept?: string[];
  texts: FileViewTexts & {
    buttonLabel: string;
  };

  onRemove?: (file: File, index: number) => void;
  onUpload?: (files: File[]) => void;
}
