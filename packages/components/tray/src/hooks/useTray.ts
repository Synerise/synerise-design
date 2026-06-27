import { useMemo } from 'react';

import { useTrayContext } from './useTrayContext';

export const useTray = () => {
  const { openTray, closeTray } = useTrayContext();

  return useMemo(
    () => ({
      open: openTray,
      close: closeTray,
    }),
    [openTray, closeTray],
  );
};
