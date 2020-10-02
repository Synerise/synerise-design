import { SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleSelectProps = {
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
} & SubtleFieldProps;

