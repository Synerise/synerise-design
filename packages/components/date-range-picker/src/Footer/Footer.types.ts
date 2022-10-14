import { WrappedComponentProps } from 'react-intl';
import { Texts } from 'DateRangePicker.types';
import { DateRange } from '../date.types';

export type Props = {
  mode: string;
  dateOnly?: boolean;
  value?: DateRange;
  canApply?: boolean;
  canSwitchMode?: boolean;
  onApply?: (date?: Date | DateRange | undefined) => void;
  onSwitchMode?: () => void;
  message?: React.ReactNode | string;
  texts: Texts;
  format?: string;
  showTime?: boolean;
  displayDateContainerClass?: string;
} & WrappedComponentProps;
