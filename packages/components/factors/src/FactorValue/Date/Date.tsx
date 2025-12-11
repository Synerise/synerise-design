import React, { useCallback, useEffect, useMemo, useState } from 'react';

import DatePicker from '@synerise/ds-date-picker';
import { getPopupContainer } from '@synerise/ds-utils';

import {
  type FactorValueComponentProps,
  type FactorsProps,
} from '../../Factors.types';

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
  uncontrolledComponent,
}: FactorValueComponentProps) => {
  const [localValue, setLocalValue] = useState<FactorsProps['value']>(value);

  useEffect(() => {
    if (!uncontrolledComponent) {
      setLocalValue(value);
    }
  }, [value, uncontrolledComponent]);

  const changeHandler = useCallback(
    (date: Date | undefined) => {
      onChange(date);
    },
    [onChange],
  );

  const localValueAsDate = useMemo(
    () => (localValue ? new Date(String(localValue)) : undefined),
    [localValue],
  );

  const handleClear = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      open && onActivate && onActivate();
    },
    [onActivate],
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
      autoFocus={opened}
      inputProps={{ autoResize: { minWidth: '123px' } }}
      onDropdownVisibleChange={handleOpenChange}
      dropdownProps={{
        open: opened,
        onOpenChange: handleOpenChange,
        getPopupContainer: getPopupContainerOverride || getPopupContainer,
        onDismiss: () => {
          onDeactivate?.();
        },
      }}
    />
  );
};

export default DateInput;
