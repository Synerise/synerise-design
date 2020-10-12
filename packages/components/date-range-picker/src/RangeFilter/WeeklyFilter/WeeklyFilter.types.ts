import { IntlShape } from 'react-intl';
import { DayOptions, RangeActions } from '../TimeWindow/TimeWindow.types';
import { FilterDefinition } from '../RangeFilter.types';

export type WeeklyFilterProps = {
  value: Days;
  onChange: (days: Days) => void;
  intl: IntlShape;
  rangeClipboard: Partial<FilterDefinition>;
} & Partial<RangeActions>;
export type DayKey = number | string;

export type Days = {
  [key in DayKey]: DayOptions;
};
