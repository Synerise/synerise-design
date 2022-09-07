import * as React from 'react';
import { WithTranslations } from '../../../../../DateRangePicker.types';
import { RangeFormContainerProps } from '../RangeFormContainer.types';
import { WithDisabledProp } from '../../../../RangeFilter.types';

export type DateLimitMode = 'Hour' | 'Range';
export type RangeFormProps = {
  mode: DateLimitMode;
  onModeChange: (mode: DateLimitMode) => void;
  title?: React.ReactNode;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartChange: (value?: Date) => void;
  onEndChange: (value?: Date) => void;
  onExactHourSelect: (value: Date) => void;
  onRangeDelete?: () => void;
  valueSelectionModes: DateLimitMode[];
} & WithTranslations &
  WithDisabledProp &
  Pick<RangeFormContainerProps, 'timePickerProps'>;
