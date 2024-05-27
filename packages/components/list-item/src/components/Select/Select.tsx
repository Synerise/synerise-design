import React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';

import * as S from './Select.styles';
import { BasicItemProps } from '../../ListItem.types';

const Select = ({ children, ...rest }: BasicItemProps) => {
  return (
    <S.SelectItem key={uuid()} {...rest}>
      {children}
    </S.SelectItem>
  );
};

export default Select;
