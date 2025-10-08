import React from 'react';

import * as S from './Divider.styles';
import { type DividerProps } from './Divider.types';

export const Divider = (props: DividerProps) => {
  return <S.MenuDivider withSideMargin dashed {...props} />;
};
