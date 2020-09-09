import { WrappedComponentProps } from 'react-intl';
import { DateFilter, DateRange } from 'date.types';
import { FilterDefinition } from './RangeFilter/RangeFilter.types';

export interface Props extends WrappedComponentProps {
  showRelativePicker?: boolean;
  showFilter?: boolean;
  showTime?: boolean;
  relativeFuture?: boolean;
  relativePast?: boolean;
  onValueChange?: (value: Partial<DateFilter> | undefined) => void;
  onApply: (value: Partial<DateFilter> | undefined) => void;
  disabledDate?: (date?: Date) => boolean;
  validate?: (value: DateRange) => { valid: boolean; message?: string };
  format?: string;
  ranges?: DateRange[];
  value: DateRange;
  forceAbsolute?: boolean;
  texts?: Texts;
  forceAdjacentMonths?: boolean;
  relativeModes?: RelativeMode[];
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
}
export type RelativeMode = 'PAST' | 'FUTURE' | 'SINCE';
export interface State {
  mode: string;
  value: DateRange;
  changed: boolean;
  filter?: FilterDefinition;
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
