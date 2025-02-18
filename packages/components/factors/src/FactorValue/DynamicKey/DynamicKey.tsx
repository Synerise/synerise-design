import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { RawInput } from '@synerise/ds-input';
import { debounce } from 'lodash';

import { DynamicKeyValueType, InputProps } from '../../Factors.types';
import * as S from './DynamicKey.style';

const DynamicKey = ({
  value,
  onChange,
  withoutTypeSelector = false,
  texts,
  opened,
  onDeactivate,
  error,
  readOnly = false,
}: InputProps) => {
  const [localValue, setLocalValue] = useState<DynamicKeyValueType>({
    key: (value as DynamicKeyValueType).key,
    value: (value as DynamicKeyValueType).value,
  });
  const [localError, setLocalError] = useState(false);
  const onChangeRef = useRef(onChange);

  const debouncedOnChange = useRef(
    debounce((inputValue: DynamicKeyValueType) => {
      onChangeRef.current && onChangeRef.current(inputValue);
    }, 300)
  ).current;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...(value as DynamicKeyValueType) };
    newValue[event.target.name] = event.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);

    if (!event.target.value.length) {
      setLocalError(true);
    } else {
      setLocalError(false);
    }
  };

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [localValue, onChange]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const trigger = (
    <>
      <RawInput
        placeholder={texts.dynamicKey.keyPlaceholder}
        value={localValue.key}
        name="key"
        onChange={handleChange}
        autoFocus={opened}
        onBlur={onDeactivate}
        error={localError || error}
        readOnly={readOnly}
      />
      <RawInput
        placeholder={texts.dynamicKey.valuePlaceholder}
        value={localValue.value}
        name="value"
        onChange={handleChange}
        error={localError || error}
        readOnly={readOnly}
      />
    </>
  );

  return (
    <S.DynamicKey data-testid="ds-factors-dynamic-key" withoutTypeSelector={withoutTypeSelector}>
      {trigger}
    </S.DynamicKey>
  );
};

export default DynamicKey;
