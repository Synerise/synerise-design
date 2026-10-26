import type { RelativeMode, Texts } from '../../../DateRangePicker.types';
import type { RelativeDateRange } from '../../../date.types';

export type TimestampRangeProps = {
  currentRange: RelativeDateRange;
  handleChange: (value: RelativeDateRange) => void;
  handleModeChange: (mode: RelativeMode | null) => void;
  onTimestampChange?: (timestamp: Date | undefined) => void;
  timestamp?: Date | undefined;
  texts: Texts;
  getValueOnReset?: (value?: Date) => RelativeDateRange | Date | undefined;
  /** Resolved `timeZone` prop, or `undefined` when it was not set. See `dateUtils/getNow`. */
  timeZone?: string;
};

/**
 * @deprecated
 */
export type Props = TimestampRangeProps;
