import { type Texts } from '../../../../DateRangePicker.types';
import { type RelativeDateRange } from '../../../../date.types';

export type Props = {
  currentRange: RelativeDateRange;
  handleDurationValueChange: (value?: string | number | null) => void;
  onDurationModifierChange: (modifier: string) => void;
  durationModifier: string;
  value: number;
  unit: string;
  onDurationUnitChange: (modifier: string) => void;
  texts: Texts;
};
