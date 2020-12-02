import { RelativeDateRange } from '../../../date.types';
import { RelativeMode, Texts } from '../../../DateRangePicker.types';

export type Props = {
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  handleChange: (value: RelativeDateRange) => void;
  handleModeChange: (mode: RelativeMode | null) => void;
  onTimestampChange?: (timestamp: Date | undefined) => void;
  timestamp?: Date | undefined;
  texts: Texts;
};
