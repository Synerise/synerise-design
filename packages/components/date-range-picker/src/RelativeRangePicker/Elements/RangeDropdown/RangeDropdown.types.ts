import {
  type DateRangePickerProps,
  type Texts,
} from '../../../DateRangePicker.types';
import { type DateRange } from '../../../date.types';

export type RangeDropdownProps = {
  ranges: DateRange[];
  currentRange: DateRange;
  texts: Texts;
  onChange: (range: DateRange | undefined) => void;
  valueTransformer?:
    | ((value: DateRange | object) => DateRange | object)
    | DateRangePickerProps['valueTransformer'];
};

/**
 * @deprecated use `DateRangePickerProps`
 */
export type Props = DateRangePickerProps;
