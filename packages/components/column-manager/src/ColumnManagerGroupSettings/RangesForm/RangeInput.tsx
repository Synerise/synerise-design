import React, { ReactText, useMemo, ChangeEvent } from 'react';
import { MaskedInput, InputProps } from '@synerise/ds-input';
import InputNumber from '@synerise/ds-input-number';
import { Props as NumberInputProps } from '@synerise/ds-input-number/dist/InputNumber.types';
import * as S from './RangesForm.styles';

type RangeInputProps = Omit<InputProps, 'value' | 'onChange'> &
  Omit<NumberInputProps, 'value' | 'onChange'> & {
    value: ReactText | undefined;
    onChange: (value: ReactText | undefined) => void;
  };

type NullableNumber = number | undefined;

const isInputOfNumberType = (type: string | undefined, value: ReactText | undefined): value is NullableNumber => {
  return type === 'number' && (typeof value === 'number' || typeof value === 'undefined');
};

const RangeInput = ({ type, value, onChange, handleInputRef, ...inputProps }: RangeInputProps) => {
  const inputMask = useMemo(() => {
    switch (type) {
      case 'text':
        return 'A';
      case 'date':
        return '11/11/1111';
      default:
        return '1';
    }
  }, [type]);

  return isInputOfNumberType(type, value) ? (
    <S.InputNumberWrapper>
      <InputNumber {...inputProps} value={value} onChange={val => onChange(val)} />
    </S.InputNumberWrapper>
  ) : (
    <MaskedInput
      {...inputProps}
      handleInputRef={handleInputRef}
      value={value}
      mask={inputMask}
      placeholderChar="_"
      resetMargin
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
    />
  );
};

export default RangeInput;
