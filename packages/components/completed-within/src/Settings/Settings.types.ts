import InputNumber from '@synerise/ds-input-number';
import {
  CompletedWithinProps,
  CompletedWithinTexts,
  CustomPeriod,
  Period,
  PeriodValue,
} from '../CompletedWithin.types';

type InputProps = React.ComponentProps<typeof InputNumber>;

export type SettingsProps = Omit<CompletedWithinProps, 'onClear' | 'onSetValue' | 'periods' | 'text'> & {
  onValueChange: InputProps['onChange'];
  onPeriodChange: (period: Period) => void;
  periods: CustomPeriod[];
  text: CompletedWithinTexts;
  maxValue: PeriodValue['value'];
};
