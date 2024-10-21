import { useState, useEffect, MutableRefObject } from 'react';
import type { InputRef } from 'antd/lib/input';

export const useInputAddonHeight = (inputRef: MutableRefObject<InputRef | null>) => {
  const [inputAddonHeight, setInputAddonHeight] = useState(0);
  useEffect(() => {
    inputRef.current && inputRef.current.input?.offsetHeight && setInputAddonHeight(inputRef.current.input?.offsetHeight);
  }, [inputRef]);
  return { inputAddonHeight };
};
