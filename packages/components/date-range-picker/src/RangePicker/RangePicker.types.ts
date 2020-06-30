import { DateRange } from '../date.types';

export interface Props {
  value: DateRange;
  onChange: (value: DateRange) => void;
  mode: string;
  disabledDate: (value: DateRange) => boolean;
}

export interface State {
  enteredTo?: Date | null;
  left: {
    month: Date | string;
    monthTitle: string;
    mode: string;
  };
  right: {
    month: Date | string;
    monthTitle: string;
    mode: string;
  };
}

export type Limit = string | Date | null | undefined;