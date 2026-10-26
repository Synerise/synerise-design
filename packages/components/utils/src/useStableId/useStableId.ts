import { useRef } from 'react';

import { generateUuid } from '../generateUuid/generateUuid';

/**
 * Returns a stable UUID that persists for the lifetime
 * of the component instance.
 */
export const useStableId = (): string => {
  const idRef = useRef<string>();

  if (!idRef.current) {
    idRef.current = generateUuid();
  }

  return idRef.current;
};
