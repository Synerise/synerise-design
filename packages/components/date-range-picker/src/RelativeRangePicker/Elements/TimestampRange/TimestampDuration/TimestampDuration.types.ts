import type { DURATION_MODIFIERS } from '../../../../constants';
import type { Texts } from '../../../../DateRangePicker.types';
import type { RelativeDateRange, RelativeUnit } from '../../../../date.types';

export type DurationModifier =
  (typeof DURATION_MODIFIERS)[keyof typeof DURATION_MODIFIERS];

export type Props = {
  currentRange: RelativeDateRange;
  handleDurationValueChange: (value?: string | number | null) => void;
  onDurationModifierChange: (modifier: DurationModifier) => void;
  durationModifier: DurationModifier;
  value: number;
  unit: RelativeUnit;
  onDurationUnitChange: (unit: RelativeUnit) => void;
  texts: Texts;
};
