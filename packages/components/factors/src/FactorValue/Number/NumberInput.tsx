import * as React from 'react';
import InputNumber from '@synerise/ds-input-number';
import { InputProps } from '../../Factors.types';

const NumberInput: React.FC<InputProps> = ({ value, onChange, texts, opened }) => {
  return (
    <InputNumber autoFocus={opened} placeholder={texts.valuePlaceholder} value={value as number} onChange={onChange} />
  );
};

export default NumberInput;
