import React from 'react';

import InputNumber from '@synerise/ds-input-number';

import * as S from './InputNumberCell.styles';
import { type InputNumberCellProps } from './InputNumberCell.types';

const InputNumberCell = ({
  inputNumberProps,
  disabled,
  ...htmlAttributes
}: InputNumberCellProps) => (
  <S.InputNumberCell {...htmlAttributes} isDisabled={disabled}>
    <InputNumber raw={true} disabled={disabled} {...inputNumberProps} />
  </S.InputNumberCell>
);

export default InputNumberCell;
