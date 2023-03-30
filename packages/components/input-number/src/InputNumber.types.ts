import * as React from 'react';
import { InputNumberProps } from 'antd/lib/input-number';

import type { TooltipProps } from '@synerise/ds-tooltip';
import { NumberToFormatOptions } from '@synerise/ds-data-format';

export interface Props extends InputNumberProps {
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  error?: boolean;
  prefixel?: React.ReactNode | string;
  suffixel?: React.ReactNode | string;
  raw?: boolean;
  tooltip?: string;
  tooltipConfig?: TooltipProps;
  valueFormatOptions?: NumberToFormatOptions;
}
