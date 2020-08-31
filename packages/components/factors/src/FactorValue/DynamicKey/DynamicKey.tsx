import * as React from 'react';
import { RawInput } from '@synerise/ds-input';
import { DynamiKeyValueType, InputProps } from '../../Factors.types';
import * as S from './DynamicKey.style';

const DynamicKey: React.FC<InputProps> = ({ value, onChange, withoutTypeSelector = false }) => {
  const handleChange = React.useCallback(
    event => {
      const newValue = { ...(value as DynamiKeyValueType) };
      newValue[event.target.name] = event.target.value;
      onChange(newValue);
    },
    [onChange, value]
  );
  return (
    <S.DynamicKey withoutTypeSelector={withoutTypeSelector}>
      <RawInput placeholder="Key" value={(value as DynamiKeyValueType).key} name="key" onChange={handleChange} />
      <RawInput placeholder="Value" value={(value as DynamiKeyValueType).value} name="value" onChange={handleChange} />
    </S.DynamicKey>
  );
};

export default DynamicKey;
