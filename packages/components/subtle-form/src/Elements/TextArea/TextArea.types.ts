import { type TextAreaProps } from '@synerise/ds-input/dist/Textarea/Textarea.types';

import { type SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleTextAreaProps = {
  minRows?: number;
  maxRows?: number;
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  autoSize?: TextareaAutosize;
  error?: boolean;
  textAreaProps?: TextAreaProps;
} & SubtleFieldProps;

export type TextareaAutosize = {
  minRows: number;
  maxRows: number;
};
