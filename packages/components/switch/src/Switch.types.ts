import { type SwitchProps as AntdSwitchProps } from 'antd/lib/switch';
import { type ReactNode } from 'react';

import { type TooltipProps as DsTooltipProps } from '@synerise/ds-tooltip';

type TooltipProps = {
  tooltipIcon?: ReactNode;
  tooltip?: ReactNode;
  tooltipConfig?: DsTooltipProps;
};

export type Props = Omit<AntdSwitchProps, 'size'> & {
  errorText?: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  withFormElementMargin?: boolean;
} & TooltipProps;
