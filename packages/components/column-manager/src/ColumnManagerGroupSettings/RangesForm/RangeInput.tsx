import React, { useMemo, ChangeEvent } from 'react';
import { MaskedInput, InputProps } from '@synerise/ds-input';
import InputNumber from '@synerise/ds-input-number';
import { Props as NumberInputProps } from '@synerise/ds-input-number/dist/InputNumber.types';
import * as S from './RangesForm.styles';

type RangeInputProps = Omit<InputProps, 'value' | 'onChange'> &
  Omit<NumberInputProps, 'value' | 'onChange'> & {
    value: string | number | null | undefined;
    onChange: (value: string | number | null | undefined) => void;
  };

type NullableNumber = number | undefined;

const isInputOfNumberType = (
  type: string | undefined,
  value: string | number | null | undefined
): value is NullableNumber | null => {
  return type === 'number' && (typeof value === 'number' || typeof value === 'undefined' || value === null);
};

const RangeInput = ({ type, value, onChange, handleInputRef, ...inputProps }: RangeInputProps) => {
  const inputMask = useMemo(() => {
    switch (type) {
      case 'text':
        return /^[A-Z]+$/;
      case 'date':
        return '11/11/1111';
      default:
        return /^\d+$/;
    }
  }, [type]);

  return isInputOfNumberType(type, value) ? (
    <S.InputNumberWrapper>
      <InputNumber {...inputProps} value={value} onChange={onChange} />
    </S.InputNumberWrapper>
  ) : (
    <MaskedInput
      {...inputProps}
      defaultValue=""
      handleInputRef={handleInputRef}
      value={value}
      mask={inputMask}
      resetMargin
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
    />
  );
};

export default RangeInput;
