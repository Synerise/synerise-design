import { IntlShape } from 'react-intl';
import { RelativeDateRange } from '../../../../date.types';

export type Props = {
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  handleDurationValueChange: (value?: number) => void;
  intl: IntlShape;
  onDurationModifierChange: (modifier: string) => void;
  durationModifier: string;
  value: number;
  unit: string;
  onDurationUnitChange: (modifier: string) => void;
};
