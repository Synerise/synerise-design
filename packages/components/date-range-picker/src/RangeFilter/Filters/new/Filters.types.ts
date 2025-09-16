import type { DateToFormatOptions } from '@synerise/ds-core';
import type { TimePickerProps } from '@synerise/ds-time-picker';

import { type DateLimitMode } from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';

export type FilterBaseProps = {
  maxEntries?: number;
  valueSelectionMode?: DateLimitMode[];
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  timeFormat?: string;
  timePickerProps?: Partial<TimePickerProps>;
  valueFormatOptions?: DateToFormatOptions;
};
