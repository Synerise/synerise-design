import React, { ReactNode } from 'react';

import * as S from './ItemWrapper.styles';

const ItemWrapper = ({ children }: { children: ReactNode}) => <S.Wrapper>{children}</S.Wrapper>;

export default ItemWrapper;
