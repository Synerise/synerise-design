import React, {
  type ReactNode,
  type RefObject,
  createContext,
  useContext,
} from 'react';

import type { Ranger } from '@tanstack/react-ranger';

interface SliderContextType {
  rangerInstance: Ranger<HTMLDivElement>;
  rangerHandles: RefObject<Record<number, HTMLElement>>;
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

type SliderProviderProps = {
  children: ReactNode;
  rangerInstance: Ranger<HTMLDivElement>;
  rangerHandles: RefObject<Record<number, HTMLElement>>;
};

export const SliderProvider = ({
  children,
  rangerInstance,
  rangerHandles,
}: SliderProviderProps) => {
  return (
    <SliderContext.Provider value={{ rangerInstance, rangerHandles }}>
      {children}
    </SliderContext.Provider>
  );
};

export const useSliderContext = (): SliderContextType => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error('useSliderContext must be used within a SliderProvider');
  }
  return context;
};
