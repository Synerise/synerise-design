import * as React from 'react';

import SubMenuContext from '../SubMenuContext/SubMenuContext';
import * as S from './Item.styles';
import { ItemProps, SubComponents } from './Item.types';


const Item: React.FC<ItemProps> & SubComponents = ({ children, active }) => {
  const subMenuContext = React.useContext(SubMenuContext);

  if (!subMenuContext) {
    throw new Error('Cannot use SubMenu.Item outside SubMenuContext');
  }

  return (
    <S.Wrapper
      className={`sub-menu__item ${active ? 'sub-menu__item--active' : ''}`}
      onClick={(): void => subMenuContext.setOpened(false)}
    >
      {children}
    </S.Wrapper>
  );
};

Item.Action = S.ItemAction;

export default Item;
