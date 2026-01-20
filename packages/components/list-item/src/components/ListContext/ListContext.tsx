import { createContext, useContext } from 'react';

import { type DelayConfig } from '@synerise/ds-popover';

import type { ListItemProps } from '../../ListItem.types';

export type ListContextProps = {
  onClick?: ListItemProps['onClick'];
  popoverDelay?: DelayConfig;
  selectedKeys?: [];
  multiple?: boolean;
};

export const ListContext = createContext<ListContextProps | undefined>(
  undefined,
);

export const useListContext = () => {
  return useContext(ListContext);
};
