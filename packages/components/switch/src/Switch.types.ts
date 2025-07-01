import { type SwitchProps as AntdSwitchProps } from 'antd/lib/switch';
import { type ReactNode } from 'react';

type TooltipProps = {
  tooltipIcon?: ReactNode;
  tooltip?: ReactNode;
};

export type Props = Omit<AntdSwitchProps, 'size'> & {
  errorText?: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  withFormElementMargin?: boolean;
} & TooltipProps;
