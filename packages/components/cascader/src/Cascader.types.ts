import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

export type Texts = 'searchPlaceholder';
export interface Category {
  path: string[];
  id: number | string;
  name: string;
}
export interface CascaderProps {
  disabled?: boolean;
  itemsTitle?: string;
  itemsTooltip?: string;
  onItemClick?: (item: MenuItemProps) => void;
  categories: Category;
}
export interface CascaderState {
  searchQuery: string;
  activeCategory: Category;
  paths: string[][] | undefined;
  enteredCategories: Array<{id: number | string; name: string; path: string[]}>;
}
