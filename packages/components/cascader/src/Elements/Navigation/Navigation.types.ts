import type { Category } from '../../Cascader.types';

export type NavigationProps = {
  breadcrumbVisible?: boolean;
  backActionVisible?: boolean;
  activeCategory: Category;
  previousCategory: Category;
  onHomeIconClick: () => void;
  onPathClick: (item: string) => void;
};

// @deprecated - use NavigationProps instead
export type Props = NavigationProps;
