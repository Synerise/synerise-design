import { WrappedComponentProps } from 'react-intl';
import { DateFilter, DateRange } from 'date.types';

export interface Props extends WrappedComponentProps {
  disabledDate?: (date?: Date) => boolean;
  format?: string;
  forceAdjacentMonths?: boolean;
  forceAbsolute?: boolean;
  onValueChange?: (value: Partial<DateFilter> | undefined) => void;
  onApply: (value: Partial<DateFilter> | undefined) => void;
  popoverPlacement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
  popoverTrigger?: React.ReactNode;
  ranges?: DateRange[];
  relativeFuture?: boolean;
  relativePast?: boolean;
  relativeModes?: RelativeMode[];
  showRelativePicker?: boolean;
  showFilter?: boolean;
  showTime?: boolean;
  texts?: Texts;
  validate?: (value: DateRange) => { valid: boolean; message?: string };
  value: DateRange;
}
export type RelativeMode = 'PAST' | 'FUTURE' | 'SINCE';
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
  clear?: string;
  now?: string;
  selectDate?: string;
  emptyDateError?: string;
}
