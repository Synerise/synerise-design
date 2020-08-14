import { IntlShape } from 'react-intl';
import { DateRange } from '../date.types';
import { Texts } from '../DateRangePicker.types';

export interface Props {
  value: DateRange;
  onChange: (value: DateRange) => void;
  mode: string;
  disabledDate?: (date?: Date) => boolean;
  dateOnly?: boolean;
  canSwitchMode?: boolean;
  onSwitchMode?: () => void;
  intl: IntlShape;
  texts?: Texts;
  forceAdjacentMonths?: boolean;
}

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
export type Limit = string | Date | null | undefined;
