import { RelativeDateRange } from '../../../../date.types';
import { Texts } from '../../../../DateRangePicker.types';

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
