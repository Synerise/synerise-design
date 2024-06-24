import type { ReactNode } from 'react';
import { TooltipProps } from '@synerise/ds-tooltip';

export type InformationCardSummaryItem = {
  label: ReactNode;
  icon: ReactNode;
  tooltip?: ReactNode;
  tooltipProps?: TooltipProps;
};
export type InformationCardSummaryProps = {
  items?: InformationCardSummaryItem[];
};
