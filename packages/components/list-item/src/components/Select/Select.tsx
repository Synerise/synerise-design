import React, { forwardRef } from 'react';
import { v4 as uuid } from 'uuid';

import '@synerise/ds-core/dist/js/style';

import {
  type BasicItemProps,
  type NestedItemProps,
} from '../../ListItem.types';
import * as S from './Select.styles';

const Select = forwardRef<HTMLDivElement, BasicItemProps & NestedItemProps>(
  ({ children, ...rest }, ref) => {
    // TODO uuid
    return (
      <S.SelectItem ref={ref} key={uuid()} {...rest}>
        {children}
      </S.SelectItem>
    );
  },
);

export default Select;
