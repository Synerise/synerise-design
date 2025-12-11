import { type Dispatch, type SetStateAction, createContext } from 'react';

import { type usePopover } from '../hooks';

export type ContextType =
  | (ReturnType<typeof usePopover> & {
      setLabelId: Dispatch<SetStateAction<string | undefined>>;
      setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
    })
  | null;

export const PopoverContext = createContext<ContextType>(null);
