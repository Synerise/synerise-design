import React from 'react';

import type { DividerProps } from '@synerise/ds-divider';

import * as S from './Divider.styles';

export const Divider = (props: DividerProps) => (
  <S.DividerWrapper>
    <Divider {...props} />
  </S.DividerWrapper>
);

export default Divider;
