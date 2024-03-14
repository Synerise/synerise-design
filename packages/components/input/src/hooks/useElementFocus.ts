import { MutableRefObject } from 'react';
import AntdInput from 'antd/lib/input';
import AntdMaskedInput from 'antd-mask-input';

export const useElementFocus = (
  ref: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | AntdMaskedInput | AntdInput | null>
) => {
  return () => {
    ref.current && ref.current.focus();
  };
};
