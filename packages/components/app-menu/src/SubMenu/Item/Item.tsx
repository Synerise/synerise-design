import * as React from 'react';

import SubMenuContext from '../SubMenuContext/SubMenuContext';
import * as S from './Item.styles';

type ItemProps = {
  active?: boolean;
};

const Item: React.FC<ItemProps> & { Action: typeof S.ItemAction } = ({ children, active }) => {
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
