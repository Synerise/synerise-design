import React, { forwardRef } from 'react';

import type { BasicItemProps } from '../../ListItem.types';
import * as S from './Danger.styles';

const Danger = forwardRef<HTMLDivElement, BasicItemProps>(
  ({ children, ...rest }, ref) => {
    return (
      <S.DangerItem ref={ref} {...rest}>
        {children}
      </S.DangerItem>
    );
  },
);

export default Danger;
