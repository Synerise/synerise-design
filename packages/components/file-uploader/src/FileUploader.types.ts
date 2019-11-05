import { FileViewTexts } from './FileView/FileView';

export interface ExtendedFile {
  file: File;
  error?: string;
  disabled?: boolean;
  progress?: number;
}

export interface FileUploaderProps {
  mode: 'single' | 'multi-medium' | 'multi-large';
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
    buttonDescription: string;
  };

  onRemove?: (file: File, index: number) => void;
  onUpload?: (files: File[]) => void;
}
