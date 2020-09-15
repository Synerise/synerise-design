import { IntlShape } from 'react-intl';
import { DayOptions } from '../TimeWindow/TimeWindow.types';

export type WeeklyFilterProps = {
  value: Days;
  onChange: (days: Days) => void;
  intl: IntlShape;
};
export type DayKey = number | string;

export type Days = {
  [key in DayKey]: DayOptions;
};
