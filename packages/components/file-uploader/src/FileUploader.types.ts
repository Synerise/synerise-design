import { FileViewTexts } from './FileView/FileView';

export interface ExtendedFile {
  file: File;
  error?: string;
  disabled?: boolean;
  progress?: number;
}

type Texts = FileViewTexts & {
  buttonLabel: string;
  buttonDescription: string;
};

export interface FileUploaderProps {
  mode: 'single' | 'multi-medium' | 'multi-large';
  description?: string;
  disabled?: boolean;
  removable?: boolean;
  infoTooltip?: string;
  label?: string;
  error?: string;
  texts: Texts;
  files: ExtendedFile[];
  accept?: string[];

  onRemove?: (file: File, index: number) => void;
  onUpload?: (files: File[]) => void;
}
