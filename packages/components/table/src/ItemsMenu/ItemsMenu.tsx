import * as React from 'react';
import * as S from './ItemsMenu.styles';

interface Props {
  children: React.ReactChildren | Element | Element[] | JSX.Element | JSX.Element[];
}

const ItemsMenu: React.FC<Props> = ({ children }: Props) => <S.ItemsMenu>{children}</S.ItemsMenu>;

export default ItemsMenu;
