import type React from 'react';

export type CopyActionProps = {
  tooltipTitleHover: React.ReactNode;
  tooltipTitleClick: React.ReactNode;
  customTriggerComponent?: React.ReactNode;
  className?: string;
  onClick: () => void;
  icon: React.ReactNode;
  iconSize?: number;
  timeToHideTooltip?: number;
};
