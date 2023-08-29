import type { SelectProps, SelectValue } from 'antd/lib/select';
import type { TooltipProps } from 'antd/lib/tooltip';
import type { ReactNode, ReactText } from 'react';
import type { CSSObject } from 'styled-components';

import type TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';

export interface Props<T = SelectValue> extends Omit<SelectProps<T>, 'listHeight'> {
  errorText?: ReactNode | string;
  error?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  tooltip?: ReactNode;
  tooltipConfig?: TooltipExtendedProps & TooltipProps;
  clearTooltip?: string;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  listHeight?: ReactText;
  grey?: boolean;
  selectorStyle?: CSSObject;
}
