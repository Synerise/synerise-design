import { IntlShape } from 'react-intl';
import { AbsoluteDateRange, DateRange, RelativeDateRange } from '../../../date.types';

export type Props = {
  ranges: DateRange[];
  currentRange: RelativeDateRange;
  value: DateRange;
  intl: IntlShape;
  onChange: (range: AbsoluteDateRange | RelativeDateRange | undefined) => void;
};
