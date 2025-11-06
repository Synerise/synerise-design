import React from 'react';

import type { PopoverProps } from './Popover.types';
import { PopoverContext } from './contexts';
import { usePopover } from './hooks';

export const Popover = ({
  children,
  modal = false,
  ...restOptions
}: PopoverProps) => {
  const popover = usePopover({ modal, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
};
