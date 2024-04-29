import type { ReactNode } from 'react';

import type { TooltipProps } from '@synerise/ds-tooltip';

export type LabelProps = {
  id?: string;
  label?: ReactNode;
  tooltip?: ReactNode;
  tooltipConfig?: TooltipProps;
  style?: object;
  className?: string;
};
