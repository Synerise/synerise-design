import { type MutableRefObject, useEffect, useState } from 'react';

export const useInputAddonHeight = (
  inputRef: MutableRefObject<HTMLInputElement | null>,
) => {
  const [inputAddonHeight, setInputAddonHeight] = useState(0);
  useEffect(() => {
    inputRef.current?.offsetHeight &&
      setInputAddonHeight(inputRef.current.offsetHeight);
  }, [inputRef]);
  return { inputAddonHeight };
};
