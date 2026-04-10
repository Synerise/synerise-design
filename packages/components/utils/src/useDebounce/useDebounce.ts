import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay = 100,
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = useCallback(
    (...args: T) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
        timerRef.current = null;
      }, delay);
    },
    [callback, delay],
  );

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  return debounced;
};
