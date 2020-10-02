import { SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleTextAreaProps = {
  minRows?: number;
  maxRows?: number;
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  autoSize?: TextareaAutosize;
} & SubtleFieldProps;

export type TextareaAutosize = {
  minRows: number;
  maxRows: number;
};
