import React, { type ComponentType, forwardRef } from 'react';

import type { ItemSize, ListItemProps } from '../../ListItem.types';
import { ListContextProvider } from '../ListContext/ListContextProvider';
import * as S from './SubMenu.styles';

type SubMenuProps = {
  dataSource?: ListItemProps[];
  onClick?: ListItemProps['onClick'];
  isOpen?: boolean;
  indentLevel: number;
  /** The parent row's size, inherited by children that do not set their own. */
  size?: ItemSize;
  ItemComponent: ComponentType<ListItemProps>;
};

export const SubMenu = forwardRef<HTMLDivElement, SubMenuProps>(
  (
    { onClick, isOpen, dataSource, indentLevel, size, ItemComponent },
    forwardedRef,
  ) => {
    return (
      <ListContextProvider onClick={onClick}>
        <S.SubMenuContainer ref={forwardedRef} isOpen={isOpen}>
          <S.SubMenuList>
            {dataSource?.map((item) => (
              <ItemComponent
                {...item}
                key={item.itemKey}
                indentLevel={indentLevel}
                size={item.size ?? size}
              />
            ))}
          </S.SubMenuList>
        </S.SubMenuContainer>
      </ListContextProvider>
    );
  },
);
