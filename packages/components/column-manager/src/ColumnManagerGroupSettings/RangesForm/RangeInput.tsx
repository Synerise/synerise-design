import * as React from 'react';
import InputNumber from '@synerise/ds-input-number';
import { MaskedInput } from '@synerise/ds-input';
import { Props } from '@synerise/ds-input/dist/Input.types';
import { Props as NumberInputProps } from '@synerise/ds-input-number/dist/InputNumber.types';
import * as S from './RangesForm.styles';

type RangeInputProps = Omit<Props, 'value' | 'onChange'> &
  Omit<NumberInputProps, 'value' | 'onChange'> & {
    value: React.ReactText | undefined;
    onChange: (value: number | string | undefined) => void;
  };

const RangeInput: React.FC<RangeInputProps> = ({ type, onChange, ...inputProps }): JSX.Element => {
  const inputMask = React.useMemo(() => {
    switch (type) {
      case 'text':
        return 'A';
      case 'date':
        return '11/11/1111';
      default:
        return '1';
    }
  }, [type]);

  return type === 'number' ? (
    <S.InputNumberWrapper>
      {/*
      // @ts-ignore */}
      <InputNumber {...inputProps} onChange={(value): void => onChange(value)} />
    </S.InputNumberWrapper>
  ) : (
    <MaskedInput
      {...inputProps}
      mask={inputMask}
      placeholderChar="_"
      resetMargin
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => onChange(event.target.value)}
    />
  );
};

export default RangeInput;
