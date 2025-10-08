import React, { type ReactNode } from 'react';

import { ListContext, type ListContextProps } from './ListContext';

export const ListContextProvider = ({
  children,
  ...rest
}: ListContextProps & { children?: ReactNode }) => {
  return <ListContext.Provider value={rest}>{children}</ListContext.Provider>;
};
