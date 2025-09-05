import { useTrayContext } from './useTrayContext';

export const useTray = () => {
  const { openTray, closeTray } = useTrayContext();

  return {
    open: openTray,
    close: closeTray,
  };
};
