import * as React from 'react';
import { sNOOPy } from '@synerise/ds-utils';

import { TagsListProps } from './TagsList.types';

export type ContextValues = {
  searchOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSearchOpen: (open: boolean) => void;
} & TagsListProps;

export const defaultValue: ContextValues = {
  withCheckbox: true,
  withTristateCheckbox: true,
  searchOpen: false,
  searchQuery: '',
  setSearchQuery: sNOOPy,
  setSearchOpen: sNOOPy,
};

const TagsListContext: React.Context<ContextValues> = React.createContext(defaultValue);

export default TagsListContext;
