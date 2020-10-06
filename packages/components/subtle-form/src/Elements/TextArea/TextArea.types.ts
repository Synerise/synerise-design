import { SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleTextAreaProps = {
  minRows?: number;
  maxRows?: number;
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  autoSize?: TextareaAutosize;
  error?: boolean;
  errorText?: string | React.ReactNode;
} & SubtleFieldProps;

export type TextareaAutosize = {
  minRows: number;
  maxRows: number;
};
