import { IntlShape } from 'react-intl';
import { RelativeMode, Texts } from 'DateRangePicker.types';
import { DateRange, RelativeDateRange } from '../../../date.types';

export type Props = {
  ranges: DateRange[];
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  intl: IntlShape;
  handleChange: (value: DateRange) => void;
  handleDurationValueChange: (value?: number) => void;
  handleOffsetValueChange: (value?: number) => void;
  handleModeChange: (mode: string | null) => void;
  handleTimestampChange?: (timestamp: Date | undefined) => void;
  timestamp?: Date | undefined;
  texts?: Texts;
  relativeModes: RelativeMode[];
};
