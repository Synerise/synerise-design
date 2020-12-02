import { DateRange, RelativeDateRange } from '../../../date.types';
import { RelativeMode, Texts } from '../../../DateRangePicker.types';

export type Props = {
  ranges: DateRange[];
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  onModeChange: (mode: RelativeMode | null) => void;
  modes: RelativeMode[];
  texts: Texts;
};
