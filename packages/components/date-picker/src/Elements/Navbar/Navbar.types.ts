import type React from 'react';

export type NavbarProps = {
  title?: React.ReactNode | React.ReactText;
  hidePrev?: boolean;
  hideNext?: boolean;
  inactivePrev?: boolean;
  inactiveNext?: boolean;
  onTitleClick?: () => void;
  onLongPrev?: () => void;
  onLongNext?: () => void;
  onShortPrev?: () => void;
  onShortNext?: () => void;
};
