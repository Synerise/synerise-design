import * as React from 'react';

import type { TimePickerProps } from '@synerise/ds-time-picker';
import type { DateToFormatOptions } from '@synerise/ds-data-format';

import { DayKey, RangeActions, TimeWindowProps, TimeWindowTexts } from '../TimeWindow.types';
import { FilterDefinition, WithDisabledProp } from '../../../RangeFilter.types';
import { DateLimitMode } from './RangeForm/RangeForm.types';

export type DateValue = [Date | undefined, Date | undefined];

export type RangeFormContainerProps = {
  activeDays: DayKey[];
  dayKeys: DayKey | DayKey[];
  getDayLabel: (dayKey: DayKey, long?: boolean) => string | object | React.ReactNode;
  getDayValue: (dayKey: DayKey) => Partial<FilterDefinition>;
  onMultipleDayTimeChange: (value: DateValue) => void;
  onDayTimeChange: (value: DateValue, dayKey: DayKey) => void;
  onModeChange?: (mode: DateLimitMode) => void;
  onRangeDelete?: () => void;
  valueSelectionModes: DateLimitMode[];
  texts: Partial<TimeWindowTexts>;
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  timeFormat?: string;
  valueFormatOptions?: DateToFormatOptions;
  timePickerProps?: Partial<TimePickerProps>;
  renderSuffix?: () => React.ReactNode;
} & Pick<TimeWindowProps, 'monthlyFilter' | 'monthlyFilterPeriod' | 'hideHeader' | 'onChange' | 'days'> &
  WithDisabledProp &
  Partial<RangeActions>;
