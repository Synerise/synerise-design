import { useRef } from 'react';
import { v4 as uuid } from 'uuid';

/**
 * Returns a stable UUID that persists for the lifetime
 * of the component instance.
 */
export const useStableId = (): string => {
  const idRef = useRef<string>();

  if (!idRef.current) {
    idRef.current = uuid();
  }

  return idRef.current;
};
