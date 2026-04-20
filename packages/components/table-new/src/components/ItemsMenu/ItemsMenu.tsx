import React, { type ReactNode } from 'react';

import * as S from './ItemsMenu.styles';

type ItemsMenuProps = {
  children: ReactNode;
  withLeftPadding?: boolean;
};

export const ItemsMenu = ({ children, withLeftPadding }: ItemsMenuProps) => (
  <S.ItemsMenu $withLeftPadding={withLeftPadding}>{children}</S.ItemsMenu>
);
