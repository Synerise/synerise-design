import { IntlShape } from 'react-intl';
import { RelativeDateRange } from '../../../date.types';

export type Props = {
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  handleChange: (value: RelativeDateRange) => void;
  handleDurationValueChange: (value?: number) => void;
  handleOffsetValueChange: (value?: number) => void;
  handleModeChange: (mode: string) => void;
  intl: IntlShape;
};
