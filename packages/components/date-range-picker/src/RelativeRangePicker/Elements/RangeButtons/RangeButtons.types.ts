import type { Texts } from '../../../DateRangePicker.types';
import type { DateRange, RelativeDateRange } from '../../../date.types';

export type Props = {
  ranges: DateRange[];
  currentRange: RelativeDateRange;
  texts: Texts;
  onChange: (range: DateRange | undefined) => void;
};
