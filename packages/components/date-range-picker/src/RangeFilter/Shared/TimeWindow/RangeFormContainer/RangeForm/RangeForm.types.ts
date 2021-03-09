import * as React from 'react';
import { WithTranslations } from '../../../../../DateRangePicker.types';
import { RangeFormContainerProps } from '../RangeFormContainer.types';

export type DateLimitMode = 'Hour' | 'Range';
export type RangeFormProps = {
  mode: DateLimitMode;
  onModeChange: (mode: DateLimitMode) => void;
  title?: React.ReactNode;
  startDate: Date;
  endDate: Date;
  onStartChange: (value: Date) => void;
  onEndChange: (value: Date) => void;
  onExactHourSelect: (value: Date) => void;
  onRangeDelete?: () => void;
  valueSelectionMode: DateLimitMode[];
} & WithTranslations &
  Pick<RangeFormContainerProps, 'timePickerProps'>;
