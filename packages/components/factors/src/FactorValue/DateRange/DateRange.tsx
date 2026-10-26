import React, { useCallback } from 'react';

import DateRangePicker, {
  type DateFilter,
  type DateRange,
} from '@synerise/ds-date-range-picker';
import { getPopupContainer } from '@synerise/ds-utils';

import type { FactorValueComponentProps } from '../../Factors.types';

const DateRangeInput = ({
  getPopupContainerOverride,
  value,
  onChange,
  error,
  texts,
  onDeactivate,
  allowClear,
  readOnly = false,
  timeZone,
}: FactorValueComponentProps) => {
  const changeHandler = useCallback(
    (date: Partial<DateFilter> | undefined) => {
      onChange(date);
    },
    [onChange],
  );

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      if (!visible) {
        onDeactivate && onDeactivate();
      }
    },
    [onDeactivate],
  );

  return (
    <DateRangePicker
      onApply={changeHandler}
      showTime
      getPopupContainer={getPopupContainerOverride || getPopupContainer}
      showFilter
      value={value as DateRange}
      texts={texts.dateRangePicker}
      relativeFuture={false}
      relativeModes={['PAST']}
      showRelativePicker
      placement="bottomLeft"
      onVisibleChange={handleVisibleChange}
      showNowButton={false}
      filterRangeDisplayMode="slider"
      filterValueSelectionModes={['Range']}
      rangePickerInputProps={{ readOnly, error, allowClear }}
      readOnly={readOnly}
      timeZone={timeZone}
    />
  );
};

export default DateRangeInput;
