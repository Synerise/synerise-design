import type { RelativeMode, Texts } from '../../../DateRangePicker.types';
import type { DateRange, RelativeDateRange } from '../../../date.types';

export type Props = {
  ranges?: DateRange[];
  currentRange: RelativeDateRange;
  currentGroup: RelativeMode | null;
  onModeChange: (mode: RelativeMode | null) => void;
  modes: RelativeMode[];
  texts: Texts;
};
