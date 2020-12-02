import { IntlShape } from 'react-intl';
import { DateRange, RelativeDateRange } from '../date.types';
import { RelativeMode, Texts } from '../DateRangePicker.types';

export type Props = {
  ranges: RelativeDateRange[];
  value: DateRange;
  onChange: (range: DateRange | undefined) => void;
  future: boolean;
  past: boolean;
  since: boolean;
  intl: IntlShape;
  texts: Texts;
  relativeModes?: RelativeMode[];
};
export type State = {
  currentGroup: RelativeMode | null;
  future: boolean;
  past: boolean;
  showCustomForm: boolean;
  currentRange: RelativeDateRange;
  groupedRanges?: DateRange[];
  sinceTimestamp?: Date | undefined;
};
