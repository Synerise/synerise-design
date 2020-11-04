import * as React from 'react';
import TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';
import { TooltipProps } from 'antd/lib/tooltip';

export type LabelProps = {
  id?: string;
  label?: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipConfig?: TooltipExtendedProps & TooltipProps;
  style?: object;
  className?: string;
};
