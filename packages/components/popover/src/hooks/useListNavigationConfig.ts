import { useRef } from 'react';

import { type UseListNavigationProps } from '@floating-ui/react';

export const useListNavigationConfig = (
  listNavigationConfig?: UseListNavigationProps,
) => {
  const listRef = useRef<(HTMLElement | null)[]>([]);
  return {
    activeIndex: null,
    enabled: false,
    listRef,
    ...listNavigationConfig,
  };
};
