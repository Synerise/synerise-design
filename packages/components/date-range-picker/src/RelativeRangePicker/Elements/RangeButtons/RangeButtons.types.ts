import { AbsoluteDateRange, DateRange, RelativeDateRange } from '../../../date.types';
import { Texts } from '../../../DateRangePicker.types';

export type Props = {
  ranges: DateRange[];
  currentRange: RelativeDateRange;
  value: DateRange;
  texts: Texts;
  onChange: (range: AbsoluteDateRange | RelativeDateRange | undefined) => void;
};
