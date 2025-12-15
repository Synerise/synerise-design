import { useContext } from 'react';

import { type ContextType, PopoverContext } from '../contexts';

export const usePopoverContext = (): Exclude<ContextType, null> => {
  const context = useContext(PopoverContext);

  if (context === null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context;
};
