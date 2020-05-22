import * as React from 'react';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

import { DataSetProps, FilterElement } from '../../Search.types';
import { SearchHeader } from '../index';
import { renderSearchList } from '../SearchItems/SearchItems';

export type SearchItemsContainerProps<T extends unknown> = {
  displayProps: DataSetProps;
  onItemClick: undefined | ((item: T) => void);
  highlight: string;
  data: T[];
  width: number;
  listProps?: object;
};
const DEFAULT_VISIBLE_ROWS = 5;
const SearchItemsContainer: React.FC<SearchItemsContainerProps<FilterElement | MenuItemProps>> = ({
  displayProps,
  data,
  width,
  highlight,
  onItemClick,
  listProps,
}) => (
  <>
    {!!displayProps.title && <SearchHeader headerText={displayProps.title} tooltip={displayProps.tooltip} />}
    {renderSearchList<FilterElement | MenuItemProps>({
      data,
      width,
      highlight,
      onItemClick,
      listProps,
      visibleRows: displayProps.visibleRows || DEFAULT_VISIBLE_ROWS,
      rowHeight: displayProps.rowHeight,
      itemRender: displayProps.itemRender as (item: FilterElement | MenuItemProps) => React.ReactElement,
    })}
  </>
);

export default SearchItemsContainer;
