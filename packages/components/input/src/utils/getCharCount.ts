import { InputProps as AntdInputProps } from 'antd/lib/input';
import { TextareaProps } from '../TextArea.types';

export const getCharCount = (value?: AntdInputProps['value'] | TextareaProps['value'], limit?: number) => {
  if (limit && value && value.toString().length > limit) return undefined;
  return value ? value.toString().length : 0;
};
