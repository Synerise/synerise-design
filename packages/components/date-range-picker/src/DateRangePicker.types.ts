import { WrappedComponentProps } from 'react-intl';
import { DateRange } from '../../types/Dates';

export interface Props extends WrappedComponentProps {
  showRelativePicker: boolean;
  showFilter: boolean;
  showTime: boolean;
  relativeFuture: boolean;
  relativePast: boolean;
  onApply: (value: DateRange) => void;
  disabledDate: () => {};
  validate: (value: DateRange) => { valid: boolean; message?: string };
  format: string;
  ranges: DateRange[];
  value: DateRange;
  forceAbsolute: boolean;
}

export interface State {
  mode: string;
  value: DateRange;
  changed: boolean;
}
