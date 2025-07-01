import { type Texts } from '../../../DateRangePicker.types';
import type {
  AbsoluteDateRange,
  DateRange,
  RelativeDateRange,
} from '../../../date.types';

export type Props = {
  ranges: DateRange[];
  currentRange: RelativeDateRange;
  value: DateRange;
  texts: Texts;
  onChange: (range: AbsoluteDateRange | RelativeDateRange | undefined) => void;
};
