import * as React from 'react';

export type AllocationConfig = {
  controlGroupEnabled?: boolean;
  controlGroupLabel?: string | React.ReactNode;
  controlGroupTooltip?: string | React.ReactNode;
  variants?: AllocationVariant[];
  onAllocationChange?: (variants?: AllocationVariant[]) => void;
};

export type AllocationVariant = {
  name: string | React.ReactNode;
  percentage: number;
  tabId: number;
  tabLetter: string | React.ReactNode;
};

export type AllocationMark = {
  value: string;
  view: number;
};

export type TrackProps = {
  width: number;
  index: number;
  isCustomColor?: boolean;
  getColor?: (index: number) => string;
};
