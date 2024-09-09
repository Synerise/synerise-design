import React, { useCallback } from 'react';
import DateRangePicker from '@synerise/ds-date-range-picker';
import { getPopupContainer } from '@synerise/ds-utils';
import { DateFilter, DateRange } from '@synerise/ds-date-range-picker/dist/date.types';
import { useIntl } from 'react-intl';
import { InputProps } from '../../Factors.types';

const DateRangeInput = ({
  getPopupContainerOverride,
  value,
  onChange,
  error,
  texts,
  onDeactivate,
  readOnly = false,
}: InputProps) => {
  const intl = useIntl();

  const changeHandler = useCallback(
    (date: Partial<DateFilter> | undefined) => {
      onChange(date);
    },
    [onChange]
  );

  const handleVisibleChange = useCallback(
    visible => {
      if (!visible) {
        onDeactivate && onDeactivate();
      }
    },
    [onDeactivate]
  );

  return (
    <DateRangePicker
      intl={intl}
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
      rangePickerInputProps={{ readOnly, error }}
      readOnly={readOnly}
    />
  );
};

export default DateRangeInput;
