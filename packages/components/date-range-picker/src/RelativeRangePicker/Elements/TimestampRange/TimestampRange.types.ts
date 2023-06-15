import { RelativeDateRange } from '../../../date.types';
import { RelativeMode, Texts } from '../../../DateRangePicker.types';

export type TimestampRangeProps = {
  currentRange: RelativeDateRange;
  handleChange: (value: RelativeDateRange) => void;
  handleModeChange: (mode: RelativeMode | null) => void;
  onTimestampChange?: (timestamp: Date | undefined) => void;
  timestamp?: Date | undefined;
  texts: Texts;
  getValueOnReset?: (value?: Date) => RelativeDateRange | Date | undefined;
};

/**
 * @deprecated
 */
export type Props = TimestampRangeProps;
