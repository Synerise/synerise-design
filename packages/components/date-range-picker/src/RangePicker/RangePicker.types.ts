import { type WrappedComponentProps } from 'react-intl';

import { type Texts } from '../DateRangePicker.types';
import { type DateRange } from '../date.types';

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
  showNowButton?: boolean;
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
