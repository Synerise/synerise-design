import { type ReactNode } from 'react';

import { type WithDisabledProp } from '../../../../RangeFilter.types';
import { type TimeWindowTexts } from '../../TimeWindow.types';
import { type RangeFormContainerProps } from '../RangeFormContainer.types';

export type DateLimitMode = 'Hour' | 'Range';
export type RangeDisplayMode = 'timepicker' | 'slider';
export type RangeFormProps = {
  mode: DateLimitMode;
  onModeChange: (mode: DateLimitMode) => void;
  title?: ReactNode;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartChange: (value?: Date) => void;
  onEndChange: (value?: Date) => void;
  onExactHourSelect: (value?: Date) => void;
  onRangeDelete?: () => void;
  valueSelectionModes: DateLimitMode[];
  rangeDisplayMode?: RangeDisplayMode;
  isInvertedRange?: boolean;
  texts: TimeWindowTexts;
} & WithDisabledProp &
  Pick<
    RangeFormContainerProps,
    'timePickerProps' | 'valueFormatOptions' | 'errorTexts'
  >;
export type RangeFormTexts = {
  range: ReactNode | string;
  hour: ReactNode | string;
};
