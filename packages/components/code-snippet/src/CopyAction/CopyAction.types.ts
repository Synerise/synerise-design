import * as React from 'react';

export type CopyActionProps = {
  tooltipTitleHover: React.ReactNode | string;
  tooltipTitleClick: React.ReactNode | string;
  className?: string;
  onClick: () => void;
  icon: React.ReactNode;
  iconSize?: number;
  timeToHideTooltip?: number;
};
