import { type IntlShape } from 'react-intl';

import { type WithTranslations } from '../../../DateRangePicker.types';
import { type FilterDefinition } from '../../RangeFilter.types';
import {
  type DateLimitMode,
  type RangeDisplayMode,
} from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import {
  type DayOptions,
  type RangeActions,
} from '../../Shared/TimeWindow/TimeWindow.types';

export type WeeklyFilterProps = {
  value: Days;
  onChange: (days: Days) => void;
  intl: IntlShape;
  rangeClipboard: Partial<FilterDefinition>;
  valueSelectionModes: DateLimitMode[];
  rangeDisplayMode?: RangeDisplayMode;
} & WithTranslations &
  Partial<RangeActions>;

export type DayKey = number | string;

export type Days = {
  [key in DayKey]: DayOptions;
};
