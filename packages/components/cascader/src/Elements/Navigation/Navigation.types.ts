import { Category } from '../../Cascader.types';

export interface Props {
  breadcrumbVisible?: boolean;
  backActionVisible?: boolean;
  activeCategory: Category;
  previousCategory: Category;
  onHomeIconClick: () => void;
  onPathClick: (item: string) => void;
}
