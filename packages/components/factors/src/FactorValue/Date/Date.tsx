import React, { useEffect, useMemo, useState } from 'react';
import { getPopupContainer } from '@synerise/ds-utils';
import DatePicker from '@synerise/ds-date-picker';
import { FactorsProps, InputProps } from '../../Factors.types';

const DateInput: React.FC<InputProps> = ({
  value,
  onChange,
  texts,
  opened,
  onDeactivate,
  onActivate,
  error,
  readOnly = false,
  getPopupContainerOverride,
}) => {
  const [localValue, setLocalValue] = useState<FactorsProps['value']>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const changeHandler = React.useCallback(
    (date: Date | undefined) => {
      onChange(date);
    },
    [onChange]
  );

  const localValueAsDate = useMemo(() => (localValue ? new Date(String(localValue)) : undefined), [localValue]);

  const handleClear = React.useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  const handleVisibleChange = React.useCallback(
    visible => {
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
      onValueChange={date => setLocalValue(date?.toDateString())}
      onApply={changeHandler}
      value={localValueAsDate}
      showTime
      useStartOfDay
      texts={texts.datePicker}
      error={error}
      readOnly={readOnly}
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
