import { ReactNode } from 'react';
import { InputNumberProps as AntdInputNumberProps } from 'antd/lib/input-number';

import type { TooltipProps } from '@synerise/ds-tooltip';
import { NumberToFormatOptions } from '@synerise/ds-data-format';

export type InputNumberProps = AntdInputNumberProps<number> & {
  errorText?: ReactNode;
  label?: ReactNode;
  defaultValue?: number | null;
  description?: ReactNode;
  error?: boolean;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  raw?: boolean;
  tooltip?: string;
  tooltipConfig?: TooltipProps;
  valueFormatOptions?: NumberToFormatOptions;
};
// @deprecated - use InputNumberProps
export type Props = InputNumberProps;
