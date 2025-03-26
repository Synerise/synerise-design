import React, { useEffect, useState } from 'react';
import InputNumber from '@synerise/ds-input-number';
import { FactorValueComponentProps } from '../../Factors.types';

const NumberInput = ({
  error,
  value,
  onChange,
  texts,
  opened,
  onDeactivate,
  readOnly = false,
}: FactorValueComponentProps) => {
  const [localValue, setLocalValue] = useState<string | number | null | undefined>(value as number);

  useEffect(() => {
    setLocalValue(value as number);
  }, [value]);

  const handleChange = (val: string | number | null | undefined) => {
    setLocalValue(val);
    onChange(val);
  };

  return (
    <InputNumber
      error={error}
      autoFocus={opened}
      placeholder={texts.valuePlaceholder}
      value={localValue as number}
      onChange={handleChange}
      onBlur={onDeactivate}
      readOnly={readOnly}
    />
  );
};

export default NumberInput;
