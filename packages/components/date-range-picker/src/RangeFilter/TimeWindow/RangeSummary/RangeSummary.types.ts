import * as React from 'react';
import { DayKey } from '../TimeWindow.types';

export type RangeSummaryProps = {
  dayKeys: DayKey | DayKey[];
  getDayLabel: (dayKey: DayKey, long?: boolean) => string | React.ReactNode | undefined;
};
