import { MutableRefObject } from 'react';
import type { InputRef } from 'antd/lib/input';

export const useElementFocus = (
  ref: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | InputRef | null>
) => {
  return () => {
    ref.current && ref.current.focus();
  };
};
