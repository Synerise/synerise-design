import { CompletedWithinProps, CustomPeriod, Period } from '../CompletedWithin.types';

export type SettingsProps = Omit<CompletedWithinProps, 'onClear' | 'onSetValue' | 'periods'> & {
  onValueChange: (value: number | undefined) => void;
  onPeriodChange: (period: Period) => void;
  periods: CustomPeriod[];
};
