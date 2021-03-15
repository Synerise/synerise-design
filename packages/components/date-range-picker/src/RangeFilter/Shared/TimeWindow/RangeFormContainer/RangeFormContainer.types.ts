import * as React from 'react';
import { TimePickerProps } from '@synerise/ds-time-picker/dist/TimePicker.types';
import { DayKey, RangeActions, TimeWindowProps, TimeWindowTexts } from '../TimeWindow.types';
import { FilterDefinition } from '../../../RangeFilter.types';
import { DateLimitMode } from './RangeForm/RangeForm.types';

export type RangeFormContainerProps = {
  activeDays: DayKey[];
  dayKeys: DayKey | DayKey[];
  getDayLabel: (dayKey: DayKey, long?: boolean) => string | object | React.ReactNode;
  getDayValue: (dayKey: DayKey) => Partial<FilterDefinition>;
  onMultipleDayTimeChange: (value: [Date, Date]) => void;
  onModeChange?: (mode: DateLimitMode) => void;
  onDayTimeChange: (value: [Date, Date], dayKey: DayKey) => void;
  onRangeDelete?: () => void;
  valueSelectionModes: DateLimitMode[];
  texts: Partial<TimeWindowTexts>;
  timeFormat?: string;
  timePickerProps?: Partial<TimePickerProps>;
  renderSuffix?: () => React.ReactNode;
} & Pick<TimeWindowProps, 'monthlyFilter' | 'monthlyFilterPeriod' | 'hideHeader' | 'onChange' | 'days'> &
  Partial<RangeActions>;
