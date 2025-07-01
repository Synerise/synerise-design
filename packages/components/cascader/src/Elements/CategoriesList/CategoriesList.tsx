import React, { type MouseEvent, useCallback } from 'react';
import styled from 'styled-components';

import { theme } from '@synerise/ds-core';
import Icon, { CheckS } from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';

import { type Category } from '../../Cascader.types';
import { hasNestedCategories } from '../../utils';
import { type CategoriesListProps } from './CategoriesList.types';

const CategoriesSuffix = styled.div``;

export const CategoriesList = ({
  rootCategory,
  onCategoryClick,
  suffixel,
  onSuffixelClick,
  selectedIds,
}: CategoriesListProps) => {
  const onCategoryClickHandler = useCallback(
    (item: Category) => {
      onCategoryClick && onCategoryClick(item);
    },
    [onCategoryClick],
  );
  const onSuffixelClickHandler = useCallback(
    (item: Category, event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onSuffixelClick && onSuffixelClick(item);
    },
    [onSuffixelClick],
  );
  const renderSuffix = (item: Category) => (
    <CategoriesSuffix
      onClick={(event: MouseEvent<HTMLDivElement>) =>
        onSuffixelClickHandler(item, event)
      }
    >
      {selectedIds.includes(item.id) ? (
        <Icon color={theme.palette['green-600']} component={<CheckS />} />
      ) : (
        suffixel
      )}
    </CategoriesSuffix>
  );

  return (
    <>
      {Object.keys(rootCategory)
        .filter((key) => rootCategory[key]?.name)
        .map((key) => {
          const item = rootCategory[key];
          return (
            <ListItem
              text={item.name}
              key={`${item.id}`}
              type={selectedIds.includes(item.id) ? undefined : 'select'}
              suffixel={renderSuffix(item)}
              parent={hasNestedCategories(item)}
              onClick={() => onCategoryClickHandler(item)}
            />
          );
        })}
    </>
  );
};
export default CategoriesList;
