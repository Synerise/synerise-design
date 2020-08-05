import * as React from 'react';
import { DateFilter, DateRange } from '../date.types';
import { Texts } from '../DateRangePicker.types';

export type Props = {
  size?: 'large' | 'default' | 'small';
  format?: string;
  showTime?: boolean;
  allowClear?: boolean;
  value?: Pick<DateRange, 'from'> & Pick<DateRange, 'to'>;
  onChange?: (value: Partial<DateFilter> | undefined) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  onClick?: () => void;
  onClear?: () => void;
  clearTooltip?: string | React.ReactNode;
  highlight?: boolean;
  texts?: Texts;
};
