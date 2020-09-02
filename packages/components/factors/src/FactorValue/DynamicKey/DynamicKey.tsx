import * as React from 'react';
import { RawInput } from '@synerise/ds-input';
import { DynamicKeyValueType, InputProps } from '../../Factors.types';
import * as S from './DynamicKey.style';

const DynamicKey: React.FC<InputProps> = ({ value, onChange, withoutTypeSelector = false, texts }) => {
  const handleChange = React.useCallback(
    event => {
      const newValue = { ...(value as DynamicKeyValueType) };
      newValue[event.target.name] = event.target.value;
      onChange(newValue);
    },
    [onChange, value]
  );
  return (
    <S.DynamicKey withoutTypeSelector={withoutTypeSelector}>
      <RawInput
        placeholder={texts.dynamicKey.keyPlaceholder}
        value={(value as DynamicKeyValueType).key}
        name="key"
        onChange={handleChange}
      />
      <RawInput
        placeholder={texts.dynamicKey.valuePlaceholder}
        value={(value as DynamicKeyValueType).value}
        name="value"
        onChange={handleChange}
      />
    </S.DynamicKey>
  );
};

export default DynamicKey;
