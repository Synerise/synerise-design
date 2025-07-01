import { type RelativeMode, type Texts } from '../../../DateRangePicker.types';
import { type DateRange, type RelativeDateRange } from '../../../date.types';

export type Props = {
  ranges?: DateRange[];
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  onModeChange: (mode: RelativeMode | null) => void;
  modes: RelativeMode[];
  texts: Texts;
};
