import * as React from 'react';
import { NOOP } from '@synerise/ds-utils';

import { TreeMenuProps } from './TreeMenu.types';

export type ContextValues = {
  searchOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSearchOpen: (open: boolean) => void;
} & TreeMenuProps;

export const defaultValue: ContextValues = {
  searchOpen: false,
  searchQuery: '',
  setSearchQuery: NOOP,
  setSearchOpen: NOOP,
  onChange: NOOP,
};

const TreeMenuContext: React.Context<ContextValues> = React.createContext(defaultValue);

export default TreeMenuContext;
