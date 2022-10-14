import { IntlShape } from 'react-intl';
import { DateRange, RelativeDateRange } from '../date.types';
import { DateRangePickerProps, RelativeMode, Texts } from '../DateRangePicker.types';

export type RelativeRangePickerProps = {
  ranges?: DateRange[];
  value: DateRange;
  onChange: (range: DateRange | undefined) => void;
  future?: boolean;
  past?: boolean;
  since?: boolean;
  intl: IntlShape;
  texts: Texts;
  relativeModes?: RelativeMode[];
  rangeUnits: DateRangePickerProps['rangeUnits'];
  showCustomRange?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueTransformer?: (e: RelativeDateRange | any) => RelativeDateRange | any;
};

export type State = {
  currentGroup: RelativeMode | null;
  future: boolean;
  past: boolean;
  showCustomForm: boolean;
  currentRange: RelativeDateRange;
  groupedRanges?: DateRange[];
  sinceTimestamp?: Date | undefined;
};

/**
 * @deprecated use `RelativeRangePickerProps`
 */
export type Props = RelativeRangePickerProps;
