import React from 'react';
import '@synerise/ds-core/dist/js/style';

import * as S from './Danger.styles';
import { BasicItemProps } from '../Text/Text.types';

const Danger = ({ children, ...rest }: BasicItemProps) => {
  return <S.DangerItem {...rest}>{children}</S.DangerItem>;
};

export default Danger;
