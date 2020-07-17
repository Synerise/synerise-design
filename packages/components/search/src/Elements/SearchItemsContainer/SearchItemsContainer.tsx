import * as React from 'react';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

import { DataSetProps, AnyObject } from '../../Search.types';
import { SearchHeader, renderSearchList } from '../index';

export type SearchItemsContainerProps<T extends AnyObject> = {
  displayProps: DataSetProps;
  onItemClick: undefined | ((item: T) => void);
  highlight: string;
  data: T[];
  width: number;
  listProps?: object;
};

const SearchItemsContainer: React.FC<SearchItemsContainerProps<object | MenuItemProps>> = ({
  displayProps,
  data,
  width,
  highlight,
  onItemClick,
  listProps,
}) => (
  <>
    {!!displayProps.title && <SearchHeader headerText={displayProps.title} tooltip={displayProps.tooltip} />}
    {renderSearchList<AnyObject | MenuItemProps>({
      data,
      width,
      highlight,
      onItemClick,
      listProps,
      rowHeight: displayProps.rowHeight,
      itemRender: displayProps.itemRender as (item: object | MenuItemProps) => React.ReactElement,
    })}
  </>
);

export default SearchItemsContainer;
