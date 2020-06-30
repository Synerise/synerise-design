import { DateRange, RelativeDateRange } from '../date.types';
import { IntlShape } from 'react-intl';

export type Props = {
  ranges: RelativeDateRange[];
  value: DateRange;
  onChange: any;
  future: boolean;
  past: boolean;
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

