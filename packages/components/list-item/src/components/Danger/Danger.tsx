import React from 'react';

import * as S from './Danger.styles';
import type { BasicItemProps } from '../../ListItem.types';

const Danger = ({ children, ...rest }: BasicItemProps) => {
  return <S.DangerItem {...rest}>{children}</S.DangerItem>;
};

export default Danger;
