import * as React from 'react';
import Divider from '@synerise/ds-divider';

import * as S from './Divider.styles';

export interface DividerProps {
  dashed?: boolean;
}

const ListDivider: React.FC<DividerProps> = ({ dashed = true }) => (
  <S.Wrapper className="ant-divider-wrapper">
    <Divider dashed={dashed} marginBottom={0} marginTop={0} />
  </S.Wrapper>
);

export default ListDivider;
