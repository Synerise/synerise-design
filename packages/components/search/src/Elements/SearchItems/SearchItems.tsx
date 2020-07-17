import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { List, ListRowProps } from 'react-virtualized';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

import { SearchItemListProps } from './SearchItems.types';

const listStyle: React.CSSProperties = { overflowX: 'unset', overflowY: 'unset' };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderSearchList<V extends any>(
  props: SearchItemListProps<V>,
  children?: React.ReactNode
): React.ReactElement<SearchItemListProps<V>> {
  return <SearchItems {...props}>{children}</SearchItems>;
}

const rowRenderer = <T extends unknown>(
  itemRender: (item: T) => React.ReactElement,
  onItemClick: undefined | ((e: T) => void),
  data: T[],
  highlight: Pick<MenuItemProps, 'highlight'> | string | undefined
) => ({ key, index, style }: ListRowProps): React.ReactElement => {
  const item = data && data[index];
  const itemReturnedFromRenderer = itemRender(item);
  const rendererCustomStyles =
    (itemReturnedFromRenderer && itemReturnedFromRenderer.props && itemReturnedFromRenderer.props.style) || {};
  const mergedStyles = { ...rendererCustomStyles, ...style };

  return React.cloneElement(itemReturnedFromRenderer, {
    key,
    ...itemReturnedFromRenderer.props,
    style: mergedStyles,
    highlight,
    onClick: () => onItemClick && onItemClick(item),
    className: 'ds-search-item',
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchItems: React.FC<SearchItemListProps<any>> = ({
  data,
  onItemClick,
  rowHeight,
  width,
  highlight,
  itemRender,
  listProps,
  visibleRows,
}) => {
  const getHeight = React.useCallback((): number => {
    if (data && visibleRows) {
      return data.length > visibleRows ? visibleRows * rowHeight : data.length * rowHeight;
    }
    return 0;
  }, [visibleRows, data, rowHeight]);

  return (
    <Menu>
      {data && (
        <List
          height={visibleRows ? getHeight() : data.length * rowHeight}
          width={width}
          style={listStyle}
          rowHeight={rowHeight}
          rowRenderer={rowRenderer(itemRender, onItemClick, data, highlight)}
          rowCount={data.length}
          {...listProps}
        />
      )}
    </Menu>
  );
};

export default SearchItems;
