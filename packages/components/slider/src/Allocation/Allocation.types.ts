import type { ReactNode } from 'react';

export type AllocationConfig = {
  controlGroupEnabled?: boolean;
  controlGroupLabel?: ReactNode;
  controlGroupTooltip?: ReactNode;
  variants?: AllocationVariant[];
  onAllocationChange?: (variants?: AllocationVariant[]) => void;
};

export type AllocationVariant = {
  name: ReactNode;
  percentage: number;
  tabId: number;
  tabLetter: ReactNode;
  minPercentage?: number;
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

export type DefinedCssRuleParameters = {
  indexes: number[];
  classConstPart: string;
  cssRule: string;
};
