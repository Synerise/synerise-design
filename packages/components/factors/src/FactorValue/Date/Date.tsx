import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getPopupContainer } from '@synerise/ds-utils';
import DatePicker from '@synerise/ds-date-picker';
import { FactorsProps, InputProps } from '../../Factors.types';

const DateInput = ({
  value,
  onChange,
  texts,
  opened,
  onDeactivate,
  onActivate,
  error,
  allowClear,
  readOnly = false,
  getPopupContainerOverride,
  includeTimezoneOffset,
}: InputProps) => {
  const [localValue, setLocalValue] = useState<FactorsProps['value']>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const changeHandler = useCallback(
    (date: Date | string | undefined) => {
      onChange(date);
    },
    [onChange]
  );

  const localValueAsDate = useMemo(() => {
    if (typeof localValue === 'string' || localValue instanceof Date) {
      return localValue;
    }
    return localValue ? new Date(String(localValue)) : undefined;
  }, [localValue]);

  const handleClear = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      if (!visible) {
        onDeactivate && onDeactivate();
        onChange(localValueAsDate);
      } else {
        onActivate && onActivate();
      }
    },
    [localValueAsDate, onActivate, onChange, onDeactivate]
  );

  return (
    <DatePicker
      onClear={handleClear}
      onApply={changeHandler}
      value={localValueAsDate}
      showTime
      useStartOfDay
      texts={texts.datePicker}
      error={error}
      readOnly={readOnly}
      allowClear={allowClear}
      includeTimezoneOffset={includeTimezoneOffset}
      inputProps={{ autoResize: { minWidth: '123px' } }}
      dropdownProps={{
        visible: opened,
        getPopupContainer: getPopupContainerOverride || getPopupContainer,
        onVisibleChange: handleVisibleChange,
      }}
    />
  );
};

export default DateInput;
