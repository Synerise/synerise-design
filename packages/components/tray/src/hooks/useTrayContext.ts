import { useContext } from 'react';

import { TrayContext, type TrayContextType } from '../contexts/TrayContext';

export const useTrayContext = (): TrayContextType => {
  const context = useContext(TrayContext);
  if (!context) {
    throw new Error('useTrayContext must be used within a TrayProvider');
  }
  return context;
};
