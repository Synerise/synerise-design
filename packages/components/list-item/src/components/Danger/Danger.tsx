import React from 'react';

import type { BasicItemProps } from '../../ListItem.types';
import * as S from './Danger.styles';

const Danger = ({ children, ...rest }: BasicItemProps) => {
  return <S.DangerItem {...rest}>{children}</S.DangerItem>;
};

export default Danger;
