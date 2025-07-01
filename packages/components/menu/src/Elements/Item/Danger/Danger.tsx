import React from 'react';

import '@synerise/ds-core/dist/js/style';

import { type BasicItemProps } from '../Text/Text.types';
import * as S from './Danger.styles';

const Danger = ({ children, ...rest }: BasicItemProps) => {
  return <S.DangerItem {...rest}>{children}</S.DangerItem>;
};

export default Danger;
