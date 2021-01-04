import { DayKey, RangeActions, TimeWindowProps, TimeWindowTexts } from '../TimeWindow.types';
import { FilterDefinition } from '../../../RangeFilter.types';

export type RangeFormContainerProps = {
  activeDays: DayKey[];
  dayKeys: DayKey | DayKey[];
  getDayLabel: (dayKey: DayKey, long?: boolean) => string | object;
  getDayValue: (dayKey: DayKey) => Partial<FilterDefinition>;
  onMultipleDayTimeChange: (value: [Date, Date]) => void;
  onDayTimeChange: (value: [Date, Date], dayKey: DayKey) => void;
  onRangeDelete?: () => void;
  texts: TimeWindowTexts;
} & Pick<TimeWindowProps, 'monthlyFilter' | 'monthlyFilterPeriod' | 'hideHeader' | 'onChange' | 'days'> &
  Partial<RangeActions>;
