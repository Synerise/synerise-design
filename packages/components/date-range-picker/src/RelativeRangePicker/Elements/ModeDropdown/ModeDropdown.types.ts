import { IntlShape } from 'react-intl';
import { DateRange, RelativeDateRange } from '../../../date.types';

export type Props = {
  ranges: DateRange[];
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  onModeChange: (mode: string | null) => void;
  intl: IntlShape;
};
