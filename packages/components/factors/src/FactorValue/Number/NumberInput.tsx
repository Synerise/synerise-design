import React, { useEffect, useState } from 'react';

import InputNumber from '@synerise/ds-input-number';

import { type FactorValueComponentProps } from '../../Factors.types';

const NumberInput = ({
  error,
  value,
  onChange,
  texts,
  opened,
  onDeactivate,
  readOnly = false,
  uncontrolledComponent,
}: FactorValueComponentProps) => {
  const [localValue, setLocalValue] = useState<
    string | number | null | undefined
  >(() => value as number);

  useEffect(() => {
    if (!uncontrolledComponent) {
      setLocalValue(value as number);
    }
  }, [value, uncontrolledComponent]);

  useEffect(() => {
    if (uncontrolledComponent && !value && localValue !== value) {
      setLocalValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, uncontrolledComponent]);

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
