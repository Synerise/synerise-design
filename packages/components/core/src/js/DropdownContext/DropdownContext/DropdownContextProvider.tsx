import React, { type ReactNode } from 'react';

import { DropdownContext, type DropdownContextProps } from '../DropdownContext';

export const DropdownContextProvider = ({
  children,
  ...rest
}: DropdownContextProps & { children?: ReactNode }) => {
  return (
    <DropdownContext.Provider value={rest}>{children}</DropdownContext.Provider>
  );
};
