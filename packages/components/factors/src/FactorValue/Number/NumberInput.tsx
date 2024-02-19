import * as React from 'react';
import InputNumber from '@synerise/ds-input-number';
import { debounce } from 'lodash';
import { ReactText, useEffect, useRef } from 'react';
import { InputProps } from '../../Factors.types';

const NumberInput: React.FC<InputProps> = ({
  error,
  value,
  onChange,
  texts,
  opened,
  onDeactivate,
  readOnly = false,
}) => {
  const [localValue, setLocalValue] = React.useState<string | number | undefined>(value as number);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [localValue, onChange]);

  useEffect(() => {
    setLocalValue(value as number);
  }, [value]);

  const debouncedOnChange = useRef(
    debounce((inputValue: ReactText | undefined): void => {
      onChangeRef.current && onChangeRef.current(inputValue);
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const handleChange = (val: string | number | undefined): void => {
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
