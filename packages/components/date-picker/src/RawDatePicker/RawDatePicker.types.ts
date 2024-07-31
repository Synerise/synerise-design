import { DatePickerProps } from '../DatePicker.types';

export type RawDatePickerProps<ValueType extends Date | string = Date> = Omit<
  DatePickerProps<ValueType>,
  'dropdownProps'
>;
