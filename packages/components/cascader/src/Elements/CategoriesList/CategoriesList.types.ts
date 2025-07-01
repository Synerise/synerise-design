import type { ReactNode, ReactText } from 'react';

import type { Category } from '../../Cascader.types';

export interface CategoriesListProps {
  rootCategory: Category;
  onCategoryClick: (item: Category) => void;
  suffixel: ReactNode | string;
  onSuffixelClick: (item: Category) => void;
  selectedIds: ReactText[];
}
