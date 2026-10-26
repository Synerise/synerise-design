import type { DateToFormatOptions } from '@synerise/ds-core';

import type { Texts } from '../DateRangePicker.types';
import type { DateRange } from '../date.types';

export type Props = {
  /**
   * The zone the `timeZone` prop resolved to, or `undefined` when it was not set. Read from a
   * prop rather than `intl`, so a consumer that has not opted in keeps rendering the way it
   * does today.
   */
  timeZone?: string;
  mode: string;
  dateOnly?: boolean;
  value?: DateRange;
  canApply?: boolean;
  canSwitchMode?: boolean;
  onApply?: (date?: Date | DateRange | undefined) => void;
  onSwitchMode?: () => void;
  message?: React.ReactNode | string;
  texts: Texts;
  valueFormatOptions?: DateToFormatOptions;
  showTime?: boolean;
  displayDateContainerClass?: string;
};
