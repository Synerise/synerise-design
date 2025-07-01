import React, { type ReactNode } from 'react';

import * as S from './ItemWrapper.styles';

type ItemWrapperProps = {
  children?: ReactNode;
};

const ItemWrapper = ({ children }: ItemWrapperProps) => (
  <S.Wrapper>{children}</S.Wrapper>
);

export default ItemWrapper;
