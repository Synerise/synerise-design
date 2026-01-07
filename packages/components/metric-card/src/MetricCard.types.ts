import { type ReactNode } from 'react';

import { type TooltipProps } from '@synerise/ds-tooltip';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type MetricCardProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    title?: ReactNode;
    headerRightSide?: ReactNode;
    hoverValue?: ReactNode;
    displayValue?: ReactNode;
    tooltip?: ReactNode;
    tooltipConfig?: TooltipProps;
    greyBackground?: boolean;
    isLoading?: boolean;
    errorMessage?: ReactNode;
    copyValue?: string;
    texts?: CopyTexts;
  }
>;

export type CopyTexts = {
  copyTooltip?: ReactNode;
  copiedTooltip?: ReactNode;
};
