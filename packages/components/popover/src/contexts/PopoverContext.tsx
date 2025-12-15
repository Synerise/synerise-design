import { type Dispatch, type SetStateAction, createContext } from 'react';

import { type UsePopoverReturn } from '../Popover.types';

export type ContextType =
  | (UsePopoverReturn & {
      setLabelId: Dispatch<SetStateAction<string | undefined>>;
      setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
    })
  | null;

export const PopoverContext = createContext<ContextType>(null);
