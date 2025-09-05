import { createContext } from 'react';

import { type TrayData } from '../components/TrayProvider';

export type TrayContextType = {
  openTray: (id: string, data: TrayData) => void;
  closeTray: (id: string) => void;
  getTrayState: (id: string) => {
    isOpen: boolean;
    data: TrayData;
  };
};

export const TrayContext = createContext<TrayContextType | undefined>(
  undefined,
);
