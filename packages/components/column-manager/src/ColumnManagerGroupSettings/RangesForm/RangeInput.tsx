import * as React from 'react';
import InputNumber from '@synerise/ds-input-number';
import { MaskedInput } from '@synerise/ds-input';
import { Props } from '@synerise/ds-input/dist/Input';
import { Props as NumberInputProps } from '@synerise/ds-input-number/dist/InputNumber';
import * as S from './RangesForm.styles';

type RangeInputProps = Props &
  NumberInputProps & {
    onChange: (value: React.ReactText) => void;
  };

const RangeInput: React.FC<RangeInputProps> = ({ type, onChange, error, ...inputProps }): JSX.Element => {
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
      <InputNumber {...inputProps} onChange={(value): void => onChange(value)} errorText={error} resetMargin />
    </S.InputNumberWrapper>
  ) : (
    <MaskedInput
      {...inputProps}
      mask={inputMask}
      placeholderChar="_"
      resetMargin
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => onChange(event.target.value)}
      errorText={error}
    />
  );
};

export default RangeInput;
