import * as React from 'react';
import Menu from '@synerise/ds-menu';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { CheckS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { Category } from '../../Cascader.types';

export interface CategoriesListProps {
  title?: string;
  tooltip?: string;
  rootCategory: Category;
  onCategoryClick: (item: any) => void;
  onSuffixelClick: (item: any) => void;
  selectedIds: Array<number | string>;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  title,
  tooltip,
  rootCategory,
  onCategoryClick,
  onSuffixelClick,
  selectedIds,
}) => {
  const onCategoryClickHandler = React.useCallback(
    item => {
      onCategoryClick && onCategoryClick(item);
    },
    [onCategoryClick]
  );
  const onSuffixelClickHandler = React.useCallback(
    (item, e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onSuffixelClick && onSuffixelClick(item);
    },
    [onSuffixelClick]
  );
  const renderSuffix = (item: Category): React.ReactNode => (
    <div onClick={(e: React.MouseEvent<HTMLDivElement>): void => onSuffixelClickHandler(item, e)}>
      {selectedIds.includes(item.id) ? <Icon color={theme.palette['green-600']} component={<CheckS />} /> : 'select'}
    </div>
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
                text={item.name}
                type={selectedIds && selectedIds.includes(item.id) ? '' : 'select'}
                key={`${item.id}`}
                suffixel={renderSuffix(item)}
                onClick={(): void => onCategoryClickHandler(item)}
              />
            );
          }
        )}
    </React.Fragment>
  );
};
export default CategoriesList;
