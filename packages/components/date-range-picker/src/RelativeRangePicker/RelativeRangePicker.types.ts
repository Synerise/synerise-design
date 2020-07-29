import { IntlShape } from 'react-intl';
import { DateRange, RelativeDateRange } from '../date.types';

export type Props = {
  ranges: RelativeDateRange[];
  value: DateRange;
  onChange: (range: DateRange | undefined) => void;
  future: boolean;
  past: boolean;
  since: boolean;
  intl: IntlShape;
};
export type GroupRange = {
  PAST?: DateRange[];
  FUTURE?: DateRange[];
};
export type State = {
  currentGroup: string | null;
  future: boolean;
  past: boolean;
  showCustomForm: boolean;
  currentRange: RelativeDateRange;
  groupedRanges?: GroupRange;
};
