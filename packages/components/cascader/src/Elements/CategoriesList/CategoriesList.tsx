import * as React from 'react';
import Menu from '@synerise/ds-menu';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { CheckS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import styled from 'styled-components';
import { Category } from '../../Cascader.types';

export interface CategoriesListProps {
  title?: string;
  tooltip?: string;
  rootCategory: Category;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCategoryClick: (item: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuffixelClick: (item: any) => void;
  selectedIds: React.ReactText[];
}
const CategoriesSuffix = styled.div``;

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
    <CategoriesSuffix onClick={(e: React.MouseEvent<HTMLDivElement>): void => onSuffixelClickHandler(item, e)}>
      {selectedIds.includes(item.id) ? <Icon color={theme.palette['green-600']} component={<CheckS />} /> : 'select'}
    </CategoriesSuffix>
  );

  return (
    <>
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
    </>
  );
};
export default CategoriesList;
