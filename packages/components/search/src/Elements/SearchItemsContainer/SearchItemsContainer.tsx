import * as React from 'react';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

import { DataSetProps, FilterElement } from '../../Search.types';
import { SearchHeader, SearchItemList } from '../index';

export type SearchItemsContainerProps<T extends unknown> = {
  displayProps: DataSetProps;
  onItemClick:  undefined | ((item: T) => void);
  highlight: string;
  data: T[];
  width: number;
};
const DEFAULT_VISIBLE_ROWS = 5;
const SearchItemsContainer: React.FC<SearchItemsContainerProps<FilterElement | MenuItemProps>> = ({
  displayProps,
  data,
  width,
  highlight,
  onItemClick,
}) => (
  <>
    {!!displayProps.title && <SearchHeader headerText={displayProps.title} tooltip={displayProps.tooltip} />}
    <SearchItemList
      data={data}
      width={width}
      visibleRows={displayProps.visibleRows || DEFAULT_VISIBLE_ROWS}
      rowHeight={displayProps.rowHeight}
      highlight={highlight}
      onItemClick={onItemClick}
      itemRender={displayProps.itemRender as (item: FilterElement | MenuItemProps) => React.ReactElement}
      listProps={{ autoHeight: true }}
    />
  </>
);

export default SearchItemsContainer;
