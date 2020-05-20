import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { Category } from '../../Cascader.types';

export interface CategoriesListProps {
  title?: string;
  tooltip?: string;
  rootCategory: Category;
  onCategoryClick: (item: any) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({ title, tooltip, rootCategory, onCategoryClick }) => {
  const clickHandler = React.useCallback(
    (item) => {
      onCategoryClick && onCategoryClick(item);
    },
    [onCategoryClick]
  );
  return (
    <React.Fragment>
      {title && <Menu.Header headerText={title} tooltip={tooltip} />}
      {Object.keys(rootCategory)
        .filter(key => rootCategory[key]?.name)
        .map(
          (key): React.ReactNode => {
            const item = rootCategory[key];
            return (
              <Menu.Item
                text={rootCategory[key].name}
                type="select"
                key={`${rootCategory[key].id}`}
                suffixel={<div>select</div>}
                onClick={(): void=>clickHandler(item)}
              />
            );
          }
        )}
    </React.Fragment>
  );
};
export default CategoriesList;
