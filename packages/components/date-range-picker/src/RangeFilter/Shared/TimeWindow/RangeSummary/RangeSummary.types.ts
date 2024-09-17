import React from 'react';
import { DayKey } from '../TimeWindow.types';
import { Texts } from '../../../../DateRangePicker.types';

export type RangeSummaryProps = {
  texts: Pick<Texts, 'setTimeFor'>;
  dayKeys: DayKey[];
  getDayLabel: (dayKey: DayKey, long?: boolean) => string | React.ReactNode | undefined;
  monthlyFilter?: boolean;
  monthlyFilterPeriod?: string;
};
