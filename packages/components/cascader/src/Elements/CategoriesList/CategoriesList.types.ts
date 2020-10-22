import * as React from 'react';
import { Category } from '../../Cascader.types';

export interface CategoriesListProps {
  rootCategory: Category;
  onCategoryClick: (item: Category) => void;
  suffixel: React.ReactNode | string;
  onSuffixelClick: (item: Category) => void;
  selectedIds: React.ReactText[];
}