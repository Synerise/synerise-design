import { type MutableRefObject } from 'react';

export const useElementFocus = <T extends { focus: () => void }>(
  ref: MutableRefObject<T | null>,
) => {
  return () => {
    ref.current && ref.current.focus();
  };
};
