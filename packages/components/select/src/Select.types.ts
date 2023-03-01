import { SelectProps, SelectValue } from 'antd/lib/select';
import * as React from 'react';
import { CSSObject } from 'styled-components';

import { TooltipProps } from '@synerise/ds-tooltip';

export interface Props<T = SelectValue> extends Omit<SelectProps<T>, 'listHeight'> {
  errorText?: React.ReactNode | string;
  error?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipConfig?: TooltipProps;
  clearTooltip?: string;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  listHeight?: React.ReactText;
  grey?: boolean;
  selectorStyle?: CSSObject;
}
