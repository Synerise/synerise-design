import { type MouseEvent, type ReactNode } from 'react';

import { type TooltipProps } from '@synerise/ds-tooltip';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type MultivalueProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    values: ProgressValue[];
    stackedBars?: boolean;
  }
>;

export type ProgressValue = {
  percent: number;
  color: string;
  onClick?: (event: MouseEvent) => void;
  tooltip?: ReactNode;
  tooltipProps?: TooltipProps;
};
