import type { InputRef } from 'antd';
import { type MutableRefObject } from 'react';

export const useElementFocus = (
  ref: MutableRefObject<
    HTMLInputElement | HTMLTextAreaElement | InputRef | null
  >,
) => {
  return () => {
    ref.current && ref.current.focus();
  };
};
