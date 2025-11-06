import React, { forwardRef } from 'react';

import type { BasicItemProps, NestedItemProps } from '../../ListItem.types';
import * as S from './Danger.styles';

const Danger = forwardRef<HTMLDivElement, BasicItemProps & NestedItemProps>(
  ({ children, ...rest }, ref) => {
    return (
      <S.DangerItem {...rest} ref={ref}>
        {children}
      </S.DangerItem>
    );
  },
);

export default Danger;
