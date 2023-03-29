import { WrappedComponentProps } from 'react-intl';

import { DateRange } from '../date.types';
import { Texts } from '../DateRangePicker.types';

export interface RangePickerProps extends WrappedComponentProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
  mode: string;
  disabledDate?: (date?: Date) => boolean;
  dateOnly?: boolean;
  canSwitchMode?: boolean;
  onSwitchMode?: () => void;
  texts: Texts;
  forceAdjacentMonths?: boolean;
  showCustomRange?: boolean;
  startAlwaysOnTheLeft?: boolean;
  jumpToStartAndEnd?: boolean;
}

/**
 * @deprecated use @{type RangePickerProps}
 */
export type Props = RangePickerProps;

export interface State {
  enteredTo?: Date | null;
  left: {
    month: Date | string;
    monthTitle: string;
    mode: string;
  };
  right: {
    month: Date | string;
    monthTitle: string;
    mode: string;
  };
}

export type Side = 'left' | 'right';
