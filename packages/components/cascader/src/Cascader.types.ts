import * as React from 'react';

export type Texts = 'searchPlaceholder';
export interface Category {
  path: string[];
  id: React.ReactText;
  name: string;
}
export interface CascaderProps {
  disabled?: boolean;
  searchClearTooltip?: string | React.ReactNode;
  searchInputPlaceholder?: string;
  onPathSelect?: (item: Path, selected: boolean) => void;
  rootCategory: Category;
  selectedCategoriesIds: React.ReactText[];
  dropdownStyle?: React.CSSProperties;
  categorySuffix?: string | React.ReactNode;
}
export interface Path {
  id: React.ReactText;
  path: string[];
}
