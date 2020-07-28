import { WrappedComponentProps } from 'react-intl';
import { DateFilter, DateRange } from 'date.types';


export interface Props extends WrappedComponentProps {
  showRelativePicker?: boolean;
  showFilter?: boolean;
  showTime?: boolean;
  relativeFuture?: boolean;
  relativePast?: boolean;
  onValueChange?: (value: Partial<DateFilter>) => void;
  onApply: (value: Partial<DateFilter>) => void;
  disabledDate?: (date?: Date) => boolean;
  validate?: (value: DateRange) => { valid: boolean; message?: string };
  format?: string;
  ranges?: DateRange[];
  value: DateRange;
  forceAbsolute?: boolean;
  texts?: Texts;
}
export interface State {
  mode: string;
  value: DateRange;
  changed: boolean;
}
export interface Texts {
  custom?: string;
  today?: string;
  yesterday?: string;
  apply?: string;
  endDatePlaceholder?: string;
  startDatePlaceholder?: string;
}
