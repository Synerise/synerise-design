import React, { forwardRef } from 'react';
import { v4 as uuid } from 'uuid';

import '@synerise/ds-core/dist/js/style';

import { type BasicItemProps } from '../../ListItem.types';
import * as S from './Select.styles';

const Select = forwardRef<HTMLDivElement, BasicItemProps>(
  ({ children, ...rest }, ref) => {
    return (
      <S.SelectItem ref={ref} key={uuid()} {...rest}>
        {children}
      </S.SelectItem>
    );
  },
);

export default Select;
