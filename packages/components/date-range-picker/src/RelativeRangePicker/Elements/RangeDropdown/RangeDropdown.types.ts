import { AbsoluteDateRange, DateRange, RelativeDateRange } from '../../../date.types';
import { DateRangePickerProps, Texts } from '../../../DateRangePicker.types';

export type RangeDropdownProps = {
  ranges: DateRange[];
  currentRange: RelativeDateRange;
  texts: Texts;
  onChange: (range: AbsoluteDateRange | RelativeDateRange | undefined) => void;
  valueTransformer?: ((value: DateRange | object) => DateRange | object) | DateRangePickerProps['valueTransformer'];
};

/**
 * @deprecated use `DateRangePickerProps`
 */
export type Props = DateRangePickerProps;
