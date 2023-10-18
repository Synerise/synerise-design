import { DateRange } from '../../../date.types';
import { DateRangePickerProps, Texts } from '../../../DateRangePicker.types';

export type RangeDropdownProps = {
  ranges: DateRange[];
  currentRange: DateRange;
  texts: Texts;
  onChange: (range: DateRange | undefined) => void;
  valueTransformer?: ((value: DateRange | object) => DateRange | object) | DateRangePickerProps['valueTransformer'];
};

/**
 * @deprecated use `DateRangePickerProps`
 */
export type Props = DateRangePickerProps;
