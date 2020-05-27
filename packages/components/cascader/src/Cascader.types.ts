import * as React from 'react';

export type Texts = 'searchPlaceholder';
export interface Category {
  id: React.ReactText;
  name: string;
  path: string[];
}
export interface CascaderProps {
  categorySuffix: string | React.ReactNode;
  dropdownMaxHeight?: number;
  dropdownStyle?: React.CSSProperties;
  onCategorySelect?: (item: Category, selected: boolean) => void;
  rootCategory: Category;
  searchClearTooltip?: string | React.ReactNode;
  searchInputPlaceholder?: string;
  selectedCategoriesIds: React.ReactText[];
}
export interface Path {
  id: React.ReactText;
  path: string[];
}
