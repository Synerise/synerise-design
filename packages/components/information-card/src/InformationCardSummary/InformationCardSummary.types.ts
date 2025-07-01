import type { Key, ReactNode } from 'react';

import type { TooltipProps } from '@synerise/ds-tooltip';

export type InformationCardSummaryItem = {
  key?: string | number;
  label: ReactNode;
  icon: ReactNode;
  tooltip?: ReactNode;
  tooltipProps?: TooltipProps;
  id?: Key;
};
export type InformationCardSummaryProps = {
  items?: InformationCardSummaryItem[];
};
