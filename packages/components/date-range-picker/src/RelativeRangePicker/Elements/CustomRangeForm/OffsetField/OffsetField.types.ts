import { IntlShape } from 'react-intl';
import { RelativeDateRange } from '../../../../date.types';

export type Props = {
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  handleChange: (value: RelativeDateRange) => void;
  handleOffsetValueChange: (value?: number) => void;
  intl: IntlShape;
};
