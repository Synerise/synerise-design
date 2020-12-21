import { InputProps } from 'antd/lib/input';
import { SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleInputProps = {
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  error?: boolean;
  errorText?: string | React.ReactNode;
  inputProps: InputProps;
} & SubtleFieldProps;
