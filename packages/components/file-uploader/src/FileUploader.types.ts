import { FileViewTexts } from './FileView/FileView';

export interface ExtendedFile {
  file: File;
  error?: string;
  disabled?: boolean;
  progress?: number;
}

type FileUploaderTexts = FileViewTexts & {
  buttonLabel: string | React.ReactNode;
  buttonDescription: string | React.ReactNode;
};

export interface FileUploaderProps {
  className?: string;
  mode: 'single' | 'multi-medium' | 'multi-large';
  filesAmount?: number;
  description?: string;
  disabled?: boolean;
  removable?: boolean;
  tooltip?: string;
  label?: string;
  error?: string;
  texts: FileUploaderTexts;
  files: ExtendedFile[];
  accept?: string[];

  onRemove?: (file: File, index: number) => void;
  onUpload?: (files: File[]) => void;
}
