import React, { type ChangeEvent, useEffect, useState } from 'react';

import {
  type DynamicKeyValueType,
  type FactorValueComponentProps,
} from '../../Factors.types';
import * as S from './DynamicKey.style';

const DynamicKey = ({
  value,
  onChange,
  withoutTypeSelector = false,
  texts,
  opened,
  onDeactivate,
  error,
  factorValueExtraProps,
  readOnly = false,
  uncontrolledComponent,
}: FactorValueComponentProps) => {
  const [localValue, setLocalValue] = useState<DynamicKeyValueType>(() => ({
    key: (value as DynamicKeyValueType).key,
    value: (value as DynamicKeyValueType).value,
  }));
  const [localError, setLocalError] = useState(false);

  const handleChange = (inputKey: 'key' | 'value', inputValue: string) => {
    const newValue = { ...(value as DynamicKeyValueType) };
    newValue[inputKey] = inputValue;
    setLocalValue(newValue);
    onChange(newValue);

    if (!inputValue.length) {
      setLocalError(true);
    } else {
      setLocalError(false);
    }
  };

  useEffect(() => {
    if (!uncontrolledComponent) {
      setLocalValue({
        key: (value as DynamicKeyValueType).key,
        value: (value as DynamicKeyValueType).value,
      });
    }
  }, [value, uncontrolledComponent]);

  const { keyInputProps = {}, valueInputProps = {} } =
    factorValueExtraProps?.dynamicKey || {};

  const trigger = (
    <>
      <S.DynamicKeyInput
        withoutTypeSelector={withoutTypeSelector}
        index={0}
        {...keyInputProps}
        placeholder={texts.dynamicKey.keyPlaceholder}
        value={localValue.key}
        name="key"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleChange('key', event.target.value)
        }
        autoFocus={opened}
        onBlur={onDeactivate}
        error={localError || error}
        readOnly={readOnly}
      />
      <S.DynamicKeyInput
        index={1}
        {...valueInputProps}
        placeholder={texts.dynamicKey.valuePlaceholder}
        value={localValue.value}
        name="value"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleChange('value', event.target.value)
        }
        error={localError || error}
        readOnly={readOnly}
      />
    </>
  );

  return (
    <S.DynamicKey
      data-testid="ds-factors-dynamic-key"
      withoutTypeSelector={withoutTypeSelector}
    >
      {trigger}
    </S.DynamicKey>
  );
};

export default DynamicKey;
