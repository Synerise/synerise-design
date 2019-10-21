import * as React from 'react';

import * as S from './ItemWrapper.styles';

const ItemWrapper: React.FC = ({ children }) => (
  <S.Wrapper>{children}</S.Wrapper>
);

export default ItemWrapper;
