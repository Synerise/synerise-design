import { RelativeMode, Texts, Props as DateRangePickerProps } from '../../../DateRangePicker.types';
import { DateRange, RelativeDateRange, RelativeUnits } from '../../../date.types';

export type Props = {
  ranges: DateRange[];
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  handleChange: (value: DateRange) => void;
  handleDurationValueChange: (value?: number) => void;
  handleOffsetValueChange: (value?: number) => void;
  handleModeChange: (mode: RelativeMode | null) => void;
  handleTimestampChange?: (timestamp: Date | undefined) => void;
  timestamp?: Date | undefined;
  texts: Texts;
  relativeModes: RelativeMode[];
  rangeUnits?: Pick<DateRangePickerProps, 'rangeUnits'>;
};

export type FieldProps = {
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  handleChange: (value: RelativeDateRange) => void;
  texts: Texts;
  rangeUnits?: RelativeUnits[];
};
