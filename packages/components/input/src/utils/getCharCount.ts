import { type TextareaProps } from '../TextArea.types';

// Native input value type (replaces the antd `InputProps['value']` this used to
// borrow — ds-input no longer depends on antd for this).
type InputValue = string | number | readonly string[];

export const getCharCount = (
  value?: InputValue | TextareaProps['value'],
  limit?: number,
) => {
  if (limit && value && value.toString().length > limit) {
    return limit;
  }
  return value ? value.toString().length : 0;
};
