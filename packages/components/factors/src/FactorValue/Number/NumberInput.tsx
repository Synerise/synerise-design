import React, { useEffect, useRef, useState } from 'react';
import InputNumber from '@synerise/ds-input-number';
import { debounce } from 'lodash';
import { InputProps } from '../../Factors.types';

const NumberInput = ({ error, value, onChange, texts, opened, onDeactivate, readOnly = false }: InputProps) => {
  const [localValue, setLocalValue] = useState<string | number | null | undefined>(value as number);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [localValue, onChange]);

  useEffect(() => {
    setLocalValue(value as number);
  }, [value]);

  const debouncedOnChange = useRef(
    debounce((inputValue: string | number | null | undefined): void => {
      onChangeRef.current && onChangeRef.current(inputValue);
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const handleChange = (val: string | number | null| undefined): void => {
    setLocalValue(val);
    debouncedOnChange(val);
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
