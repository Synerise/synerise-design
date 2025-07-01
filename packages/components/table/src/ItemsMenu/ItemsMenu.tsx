import React from 'react';

import * as S from './ItemsMenu.styles';
import { type Props } from './ItemsMenu.types';

const ItemsMenu = ({ children }: Props) => (
  <S.ItemsMenu>{children}</S.ItemsMenu>
);

export default ItemsMenu;
