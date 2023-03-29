import type { SelectProps, SelectValue } from 'antd/lib/select';
import type { TooltipProps } from 'antd/lib/tooltip';
import type * as React from 'react';
import type { CSSObject } from 'styled-components';

import type TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';

export interface Props<T = SelectValue> extends Omit<SelectProps<T>, 'listHeight'> {
  errorText?: React.ReactNode | string;
  error?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipConfig?: TooltipExtendedProps & TooltipProps;
  clearTooltip?: string;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  listHeight?: React.ReactText;
  grey?: boolean;
  selectorStyle?: CSSObject;
}
