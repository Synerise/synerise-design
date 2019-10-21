import * as React from 'react';
import Divider from '@synerise/ds-divider';

import * as S from './Divider.styles';

const ListDivider: React.FC = () => (
  <S.Wrapper>
    <Divider dashed marginBottom={0} marginTop={0} />
  </S.Wrapper>
);

export default ListDivider;
