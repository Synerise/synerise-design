import React, { type ReactNode } from 'react';

import { FloatingDelayGroup } from '@synerise/ds-popover';

import { ListContext, type ListContextProps } from './ListContext';

export const ListContextProvider = ({
  children,
  popoverDelay = { open: 100, close: 400 },
  ...rest
}: ListContextProps & { children?: ReactNode }) => {
  return (
    <FloatingDelayGroup delay={popoverDelay}>
      <ListContext.Provider value={rest}>{children}</ListContext.Provider>
    </FloatingDelayGroup>
  );
};
