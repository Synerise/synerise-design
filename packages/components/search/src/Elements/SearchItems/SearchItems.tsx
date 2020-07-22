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
  height,
  highlight,
  itemRender,
  listProps,
  onItemClick,
  rowHeight,
  visibleRows,
  width,
}) => {
  const getHeight = React.useCallback((): number => {
    if (data) {
      const dataHeight = data.length * rowHeight;

      if (visibleRows) {
        return visibleRows > data.length ? visibleRows * rowHeight : dataHeight;
      }

      if (height) {
        return dataHeight > height ? height : dataHeight;
      }

      return dataHeight;
    }
    return 0;
  }, [data, height, rowHeight, visibleRows]);

  return (
    <Menu>
      {data && (
        <List
          height={getHeight()}
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
