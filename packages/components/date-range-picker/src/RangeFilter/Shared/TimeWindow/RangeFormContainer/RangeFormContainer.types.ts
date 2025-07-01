import { type ReactNode } from 'react';

import type { DateToFormatOptions } from '@synerise/ds-data-format';
import type { TimePickerProps } from '@synerise/ds-time-picker';

import {
  type FilterDefinition,
  type WithDisabledProp,
} from '../../../RangeFilter.types';
import {
  type DayKey,
  type RangeActions,
  type TimeWindowProps,
  type TimeWindowTexts,
} from '../TimeWindow.types';
import {
  type DateLimitMode,
  type RangeDisplayMode,
} from './RangeForm/RangeForm.types';

export type DateValue = [
  Date | undefined,
  Date | undefined,
  boolean | undefined,
];

export type FilterErrorType = [ReactNode?, ReactNode?];

export type RangeFormContainerProps = {
  errorTexts?: FilterErrorType;
  activeDays: DayKey[];
  dayKeys: DayKey | DayKey[];
  getDayLabel: (dayKey: DayKey, long?: boolean) => ReactNode;
  getDayValue: (dayKey: DayKey) => Partial<FilterDefinition>;
  onMultipleDayTimeChange: (value: DateValue) => void;
  onDayTimeChange: (value: DateValue, dayKey: DayKey) => void;
  onModeChange?: (mode: DateLimitMode) => void;
  onRangeDelete?: () => void;
  valueSelectionModes: DateLimitMode[];
  rangeDisplayMode?: RangeDisplayMode;
  texts: TimeWindowTexts;
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  timeFormat?: string;
  valueFormatOptions?: DateToFormatOptions;
  timePickerProps?: Partial<TimePickerProps>;
  renderSuffix?: () => ReactNode;
} & Pick<
  TimeWindowProps,
  | 'monthlyFilter'
  | 'monthlyFilterPeriod'
  | 'hideHeader'
  | 'headerOptions'
  | 'onChange'
  | 'days'
> &
  WithDisabledProp &
  Partial<RangeActions>;
