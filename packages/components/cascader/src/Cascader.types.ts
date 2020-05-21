import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import * as React from 'react';

export type Texts = 'searchPlaceholder';
export interface Category {
  path: string[];
  id: React.ReactText;
  name: string;
}
export interface CascaderProps {
  disabled?: boolean;
  searchInputPlaceholder: string;
  itemsTitle?: string;
  itemsTooltip?: string;
  onItemClick?: (item: MenuItemProps) => void;
  rootCategory: Category;
}
export interface Path {
  id: React.ReactText;
  path: string[];
}