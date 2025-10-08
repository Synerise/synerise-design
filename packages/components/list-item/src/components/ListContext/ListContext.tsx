import { createContext, useContext } from 'react';

import type { ListItemProps } from '../../ListItem.types';

export type ListContextProps = {
  onClick?: ListItemProps['onClick'];
  onItemSelect?: ListItemProps['onItemSelect'];
  selectedKeys?: [];
  multiple?: boolean;
};

export const ListContext = createContext<ListContextProps | undefined>(
  undefined,
);

export const useListContext = () => {
  return useContext(ListContext);
};
