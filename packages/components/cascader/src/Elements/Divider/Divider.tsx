import * as React from 'react';
import { DividerProps } from '@synerise/ds-divider/dist/Divider';
import * as S from './Divider.styles';

const Divider: React.FC<DividerProps> = (props) => (
  <S.DividerWrapper>
    <Divider {...props}/>
  </S.DividerWrapper>
);

export default Divider;
