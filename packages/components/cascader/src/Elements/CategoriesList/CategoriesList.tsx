import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { theme } from '@synerise/ds-core';
import Icon, { CheckS } from '@synerise/ds-icon';
import styled from 'styled-components';
import { Category } from '../../Cascader.types';
import { hasNestedCategories } from '../../utlis';
import { CategoriesListProps } from './CategoriesList.types';

const CategoriesSuffix = styled.div``;

const CategoriesList: React.FC<CategoriesListProps> = ({
  rootCategory,
  onCategoryClick,
  suffixel,
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
      {selectedIds.includes(item.id) ? <Icon color={theme.palette['green-600']} component={<CheckS />} /> : suffixel}
    </CategoriesSuffix>
  );

  return (
    <>
      {Object.keys(rootCategory)
        .filter(key => rootCategory[key]?.name)
        .map((key): React.ReactNode => {
          const item = rootCategory[key];
          return (
            <Menu.Item
              text={item.name}
              type={selectedIds && selectedIds.includes(item.id) ? '' : 'select'}
              key={`${item.id}`}
              suffixel={renderSuffix(item)}
              parent={hasNestedCategories(item)}
              onClick={(): void => onCategoryClickHandler(item)}
            />
          );
        })}
    </>
  );
};
export default CategoriesList;
