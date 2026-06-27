import React, { type ReactNode, useCallback, useMemo, useState } from 'react';

import { TrayContext } from '../contexts/TrayContext';

type TrayState = {
  [trayId: string]: {
    isOpen: boolean;
    data: TrayData;
  };
};

export type TrayData = {
  content: ReactNode;
  title: ReactNode;
  headerRightSide?: ReactNode;
  onClose?: (id: string) => void;
  footer?: ReactNode;
};
export type TrayProviderProps = {
  children: ReactNode;
};

export const TrayProvider = ({ children }: TrayProviderProps) => {
  const [trayState, setTrayState] = useState<TrayState>({});

  const openTray = useCallback((id: string, data: TrayData) => {
    setTrayState((prev) => ({
      ...prev,
      [id]: { isOpen: true, data },
    }));
  }, []);

  const closeTray = useCallback((id: string) => {
    setTrayState((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  }, []);

  const getTrayState = useCallback(
    (id: string) => {
      return trayState[id] || { isOpen: false, data: null };
    },
    [trayState],
  );

  const value = useMemo(
    () => ({ openTray, closeTray, getTrayState }),
    [openTray, closeTray, getTrayState],
  );

  return <TrayContext.Provider value={value}>{children}</TrayContext.Provider>;
};
