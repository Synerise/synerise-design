import * as React from 'react';
import * as S from './ItemsMenu.styles';
import { Props } from './ItemsMenu.types';

const ItemsMenu: React.FC<Props> = ({ children }: Props) => <S.ItemsMenu>{children}</S.ItemsMenu>;

export default ItemsMenu;
