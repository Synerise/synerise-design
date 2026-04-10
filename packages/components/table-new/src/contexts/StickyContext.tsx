import { createContext, useContext } from 'react';

import { type StickyData } from '../Table.types';

type StickyContextType = {
  stickyData: StickyData;
  setStickyData: React.Dispatch<React.SetStateAction<StickyData>>;
};

export const StickyContext = createContext<StickyContextType | null>(null);

export const useStickyContext = () => {
  return useContext(StickyContext);
};
