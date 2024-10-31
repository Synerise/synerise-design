import { ReactNode } from 'react';

import type { TimePickerProps } from '@synerise/ds-time-picker';
import type { DateToFormatOptions } from '@synerise/ds-data-format';

import { DayKey, RangeActions, TimeWindowProps, TimeWindowTexts } from '../TimeWindow.types';
import { FilterDefinition, WithDisabledProp } from '../../../RangeFilter.types';
import { DateLimitMode, RangeDisplayMode } from './RangeForm/RangeForm.types';

export type DateValue = [Date | undefined, Date | undefined, boolean | undefined];

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
  'monthlyFilter' | 'monthlyFilterPeriod' | 'hideHeader' | 'headerOptions' | 'onChange' | 'days'
> &
  WithDisabledProp &
  Partial<RangeActions>;
