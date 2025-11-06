import React, { type ComponentType, forwardRef } from 'react';

import { type ListItemProps } from '../../ListItem.types';
import { ListContextProvider } from '../ListContext/ListContextProvider';
import * as S from './SubMenu.styles';

type SubMenuProps = {
  dataSource?: ListItemProps[];
  onClick?: ListItemProps['onClick'];
  isOpen?: boolean;
  indentLevel: number;
  ItemComponent: ComponentType<ListItemProps>;
};

export const SubMenu = forwardRef<HTMLDivElement, SubMenuProps>(
  (
    { onClick, isOpen, dataSource, indentLevel, ItemComponent },
    forwardedRef,
  ) => {
    return (
      <ListContextProvider onClick={onClick}>
        <S.SubMenuContainer ref={forwardedRef} isOpen={isOpen}>
          {dataSource?.map((item) => (
            <ItemComponent
              {...item}
              key={item.itemKey}
              indentLevel={indentLevel}
            />
          ))}
        </S.SubMenuContainer>
      </ListContextProvider>
    );
  },
);
