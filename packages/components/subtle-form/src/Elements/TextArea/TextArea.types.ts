import { TextAreaProps } from '@synerise/ds-input/dist/Textarea/Textarea.types';
import { SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleTextAreaProps = {
  minRows?: number;
  maxRows?: number;
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  autoSize?: TextareaAutosize;
  error?: boolean;
  errorText?: React.ReactNode;
  textAreaProps?: TextAreaProps;
} & SubtleFieldProps;

export type TextareaAutosize = {
  minRows: number;
  maxRows: number;
};
