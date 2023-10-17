import { ReactNode } from 'react';
import { WithTranslations } from '../../../../../DateRangePicker.types';
import { RangeFormContainerProps } from '../RangeFormContainer.types';
import { WithDisabledProp } from '../../../../RangeFilter.types';

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
} & WithTranslations &
  WithDisabledProp &
  Pick<RangeFormContainerProps, 'timePickerProps' | 'valueFormatOptions' | 'errorTexts'>;
export type RangeFormTexts = {
  range: ReactNode | string;
  hour: ReactNode | string;
};
