import { IntlShape } from 'react-intl';
import { RelativeDateRange } from '../../../../date.types';

export type Props = {
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  handleChange: (value: RelativeDateRange) => void;
  handleDurationValueChange: (value?: number) => void;
  intl: IntlShape;
  onDurationModifierChange: (modifier: string) => void;
  durationModifier: string;
};
