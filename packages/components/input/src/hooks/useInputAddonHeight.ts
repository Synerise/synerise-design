import { useState, useEffect, MutableRefObject } from 'react';
import type { InputRef } from 'antd/lib/input';
import AntdMaskedInput from 'antd-mask-input';

export const useInputAddonHeight = (inputRef: MutableRefObject<InputRef | AntdMaskedInput | null>) => {
  const [inputAddonHeight, setInputAddonHeight] = useState(0);
  useEffect(() => {
    inputRef.current && inputRef.current.input?.offsetHeight && setInputAddonHeight(inputRef.current.input?.offsetHeight);
  }, [inputRef]);
  return { inputAddonHeight };
};
