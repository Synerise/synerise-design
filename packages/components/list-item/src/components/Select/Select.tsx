import React, { forwardRef } from 'react';

import {
  type BasicItemProps,
  type NestedItemProps,
} from '../../ListItem.types';
import * as S from './Select.styles';

const Select = forwardRef<HTMLDivElement, BasicItemProps & NestedItemProps>(
  ({ children, ...rest }, ref) => {
    return (
      <S.SelectItem ref={ref} {...rest}>
        {children}
      </S.SelectItem>
    );
  },
);

export default Select;
