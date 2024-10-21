import { MutableRefObject } from 'react';
import type { InputRef } from 'antd/lib/input';
import AntdMaskedInput from 'antd-mask-input';

export const useElementFocus = (
  ref: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | AntdMaskedInput | InputRef | null>
) => {
  return () => {
    ref.current && ref.current.focus();
  };
};
