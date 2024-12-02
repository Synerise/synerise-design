import React, { useCallback } from 'react';
import DateRangePicker from '@synerise/ds-date-range-picker';
import { getPopupContainer } from '@synerise/ds-utils';
import { DateFilter, DateRange } from '@synerise/ds-date-range-picker/dist/date.types';
import { InputProps } from '../../Factors.types';

const DateRangeInput = ({
  getPopupContainerOverride,
  value,
  onChange,
  error,
  texts,
  onDeactivate,
  allowClear,
  readOnly = false,
}: InputProps) => {
  const changeHandler = useCallback(
    (date: Partial<DateFilter> | undefined) => {
      onChange(date);
    },
    [onChange]
  );

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      if (!visible) {
        onDeactivate && onDeactivate();
      }
    },
    [onDeactivate]
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
      popoverProps={{
        placement: 'bottomLeft',
        onVisibleChange: handleVisibleChange,
      }}
      showNowButton={false}
      filterRangeDisplayMode="slider"
      filterValueSelectionModes={['Range']}
      rangePickerInputProps={{ readOnly, error, allowClear }}
      readOnly={readOnly}
    />
  );
};

export default DateRangeInput;
