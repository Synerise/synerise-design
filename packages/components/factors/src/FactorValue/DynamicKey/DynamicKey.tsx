import React, { ChangeEvent, useEffect, useState } from 'react';
import { RawInput } from '@synerise/ds-input';

import { DynamicKeyValueType, FactorValueComponentProps } from '../../Factors.types';
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
}: FactorValueComponentProps) => {
  const [localValue, setLocalValue] = useState<DynamicKeyValueType>({
    key: (value as DynamicKeyValueType).key,
    value: (value as DynamicKeyValueType).value,
  });
  const [localError, setLocalError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...(value as DynamicKeyValueType) };
    newValue[event.target.name] = event.target.value;
    setLocalValue(newValue);
    onChange(newValue);

    if (!event.target.value.length) {
      setLocalError(true);
    } else {
      setLocalError(false);
    }
  };

  useEffect(() => {
    setLocalValue({
      key: (value as DynamicKeyValueType).key,
      value: (value as DynamicKeyValueType).value,
    });
  }, [value]);

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
