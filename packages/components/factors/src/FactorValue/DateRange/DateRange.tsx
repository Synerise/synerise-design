import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import DateRangePicker from '@synerise/ds-date-range-picker';
import {
  type DateFilter,
  type DateRange,
} from '@synerise/ds-date-range-picker/dist/date.types';
import { getPopupContainer } from '@synerise/ds-utils';

import { type FactorValueComponentProps } from '../../Factors.types';

const DateRangeInput = ({
  getPopupContainerOverride,
  value,
  onChange,
  error,
  texts,
  onDeactivate,
  allowClear,
  readOnly = false,
}: FactorValueComponentProps) => {
  const intl = useIntl();

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
      placement="bottomLeft"
      onVisibleChange={handleVisibleChange}
      showNowButton={false}
      filterRangeDisplayMode="slider"
      filterValueSelectionModes={['Range']}
      rangePickerInputProps={{ readOnly, error, allowClear }}
      readOnly={readOnly}
    />
  );
};

export default DateRangeInput;
