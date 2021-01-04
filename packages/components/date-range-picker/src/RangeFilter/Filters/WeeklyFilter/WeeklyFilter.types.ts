import { IntlShape } from 'react-intl';
import { DayOptions, RangeActions } from '../../Shared/TimeWindow/TimeWindow.types';
import { FilterDefinition } from '../../RangeFilter.types';
import { WithTranslations } from '../../../DateRangePicker.types';

export type WeeklyFilterProps = {
  value: Days;
  onChange: (days: Days) => void;
  intl: IntlShape;
  rangeClipboard: Partial<FilterDefinition>;
} & WithTranslations &
  Partial<RangeActions>;

export type DayKey = number | string;

export type Days = {
  [key in DayKey]: DayOptions;
};
