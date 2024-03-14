import { useState, useEffect, MutableRefObject } from 'react';
import AntdInput from 'antd/lib/input';
import AntdMaskedInput from 'antd-mask-input';

export const useInputAddonHeight = (inputRef: MutableRefObject<AntdInput | AntdMaskedInput | null>) => {
  const [inputAddonHeight, setInputAddonHeight] = useState(0);
  useEffect(() => {
    inputRef.current && setInputAddonHeight(inputRef.current.input?.offsetHeight);
  }, [inputRef]);
  return { inputAddonHeight };
};
