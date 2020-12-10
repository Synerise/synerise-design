import { CompletedWithinProps, CompletedWithinTexts, CustomPeriod, Period } from '../CompletedWithin.types';

export type SettingsProps = Omit<CompletedWithinProps, 'onClear' | 'onSetValue' | 'periods' | 'text'> & {
  onValueChange: (value: number | undefined) => void;
  onPeriodChange: (period: Period) => void;
  periods: CustomPeriod[];
  text: CompletedWithinTexts;
};
