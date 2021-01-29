import * as React from 'react';
import { TagsListProps } from './TagsList.types';

type ContextValues = {
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
  setSearchQuery: (query: string) => {},
  setSearchOpen: (open: boolean) => {}
}

const TagsListContext: React.Context<ContextValues> = React.createContext(defaultValue);

export default TagsListContext;