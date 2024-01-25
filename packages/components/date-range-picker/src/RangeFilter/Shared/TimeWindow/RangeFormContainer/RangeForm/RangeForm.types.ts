import { ReactNode } from 'react';
import { RangeFormContainerProps } from '../RangeFormContainer.types';
import { WithDisabledProp } from '../../../../RangeFilter.types';
import { TimeWindowTexts } from '../../TimeWindow.types';

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
  Pick<RangeFormContainerProps, 'timePickerProps' | 'valueFormatOptions' | 'errorTexts'>;
export type RangeFormTexts = {
  range: ReactNode | string;
  hour: ReactNode | string;
};
