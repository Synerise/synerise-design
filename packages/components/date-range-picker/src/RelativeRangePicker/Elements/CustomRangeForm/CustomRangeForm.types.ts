import type {
  DateRangePickerProps,
  RelativeMode,
  Texts,
} from '../../../DateRangePicker.types';
import type {
  DateRange,
  RelativeDateRange,
  RelativeUnits,
} from '../../../date.types';

export type Props = {
  ranges?: DateRange[];
  currentRange: RelativeDateRange;
  currentGroup: RelativeMode | null;
  handleChange: (value: DateRange) => void;
  handleDurationValueChange: (value?: string | number | null) => void;
  handleOffsetValueChange: (value?: string | number | null) => void;
  handleModeChange: (mode: RelativeMode | null) => void;
  handleTimestampChange?: (timestamp: Date | undefined) => void;
  timestamp?: Date | undefined;
  texts: Texts;
  relativeModes: RelativeMode[];
  rangeUnits: DateRangePickerProps['rangeUnits'];
  /** Resolved `timeZone` prop, or `undefined` when it was not set. See `dateUtils/getNow`. */
  timeZone?: string;
};

export type FieldProps = {
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  handleChange: (value: RelativeDateRange) => void;
  texts: Texts;
  rangeUnits?: RelativeUnits[];
};
