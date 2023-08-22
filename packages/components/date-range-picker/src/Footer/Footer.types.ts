import { WrappedComponentProps } from 'react-intl';

import { DateToFormatOptions } from '@synerise/ds-data-format';

import { Texts } from '../DateRangePicker.types';
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
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  format?: string;
  valueFormatOptions?: DateToFormatOptions;
  showTime?: boolean;
  displayDateContainerClass?: string;
} & WrappedComponentProps;
