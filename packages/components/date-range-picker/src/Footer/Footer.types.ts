import type { DateToFormatOptions } from '@synerise/ds-data-format';

import type { Texts } from '../DateRangePicker.types';
import type { DateRange } from '../date.types';

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
};
