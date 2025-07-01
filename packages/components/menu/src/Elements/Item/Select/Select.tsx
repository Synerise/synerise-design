import React from 'react';
import { v4 as uuid } from 'uuid';

import '@synerise/ds-core/dist/js/style';

import { type BasicItemProps } from '../Text/Text.types';
import * as S from './Select.styles';

const Select = ({ disabled, children, ...rest }: BasicItemProps) => {
  return (
    <S.SelectItem key={uuid()} disabled={disabled} {...rest}>
      {children}
    </S.SelectItem>
  );
};

export default Select;
