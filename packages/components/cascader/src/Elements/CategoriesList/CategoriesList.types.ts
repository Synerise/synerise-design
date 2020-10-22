import * as React from 'react';
import { Category } from '../../Cascader.types';
import { RefObject } from 'react';

export interface CategoriesListProps {
  ref?: RefObject<HTMLDivElement>;
  rootCategory: Category;
  onCategoryClick: (item: Category) => void;
  suffixel: React.ReactNode | string;
  onSuffixelClick: (item: Category) => void;
  selectedIds: React.ReactText[];
}