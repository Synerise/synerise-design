import {
  type DateRangePickerProps,
  type RelativeMode,
  type Texts,
} from '../../../DateRangePicker.types';
import {
  type DateRange,
  type RelativeDateRange,
  type RelativeUnits,
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
};

export type FieldProps = {
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  handleChange: (value: RelativeDateRange) => void;
  texts: Texts;
  rangeUnits?: RelativeUnits[];
};
