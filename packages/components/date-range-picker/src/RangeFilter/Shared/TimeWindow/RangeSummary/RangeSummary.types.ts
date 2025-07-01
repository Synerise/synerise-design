import type { ReactNode } from 'react';

import { type Texts } from '../../../../DateRangePicker.types';
import { type DayKey } from '../TimeWindow.types';

export type RangeSummaryProps = {
  texts: Pick<Texts, 'setTimeFor'>;
  dayKeys: DayKey[];
  getDayLabel: (dayKey: DayKey, long?: boolean) => ReactNode;
  monthlyFilter?: boolean;
  monthlyFilterPeriod?: string;
};
