import type { CSSProperties, ReactNode, ReactText } from 'react';

export type Texts = 'searchPlaceholder';
export type Category = {
  id: ReactText;
  name: string;
  path: string[];
};
export type CascaderProps = {
  categorySuffix: ReactNode;
  maxHeight?: number;
  contentStyles?: CSSProperties;
  onCategorySelect?: (item: Category, selected: boolean) => void;
  rootCategory: Category;
  searchClearTooltip?: ReactNode;
  searchInputPlaceholder?: string;
  selectedCategoriesIds: ReactText[];
};
export type Path = {
  id: ReactText;
  path: string[];
};
