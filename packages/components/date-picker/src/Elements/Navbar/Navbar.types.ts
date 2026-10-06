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
  /**
   * One step per side instead of two: the month, year and decade grids move by a single unit,
   * so the step keeps the outer position the double angle holds in the day view but is drawn as
   * a single angle, and the unused inner slot is left out rather than held open by a placeholder.
   */
  singleStep?: boolean;
  onShortPrev?: () => void;
  onShortNext?: () => void;
};
