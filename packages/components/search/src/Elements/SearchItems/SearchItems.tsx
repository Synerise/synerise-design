import React, { useMemo, useRef, ReactNode, ReactElement, CSSProperties, useEffect, cloneElement } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import Menu from '@synerise/ds-menu';
import type { MenuItemProps } from '@synerise/ds-menu';

import { SearchItemListProps } from './SearchItems.types';

const listStyle: CSSProperties = { overflowX: 'unset', overflowY: 'unset' };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderSearchList<V extends any>(
  props: SearchItemListProps<V>,
  children?: ReactNode
): ReactElement<SearchItemListProps<V>> {
  return <SearchItems {...props}>{children}</SearchItems>;
}

type ItemData<T extends unknown> = {
  itemRender: (item: T) => ReactElement;
  onItemClick: undefined | ((e: T) => void);
  items: T[];
  highlight: Pick<MenuItemProps, 'highlight'> | string | undefined;
};

const rowRenderer = ({
  index,
  style,
  data,
}: Omit<ListChildComponentProps, 'data'> & { data: ItemData<Record<string, unknown>> }): ReactElement => {
  const item = data && data.items[index];
  const itemReturnedFromRenderer = data.itemRender(item);
  const rendererCustomStyles =
    (itemReturnedFromRenderer && itemReturnedFromRenderer.props && itemReturnedFromRenderer.props.style) || {};
  const mergedStyles = { ...rendererCustomStyles, ...style };

  return cloneElement(itemReturnedFromRenderer, {
    ...itemReturnedFromRenderer.props,
    style: mergedStyles,
    highlight: data.highlight,
    onClick: () => data.onItemClick && data.onItemClick(item),
    className: 'ds-search-item',
  });
};

const SearchItems = ({
  data,
  height,
  highlight,
  itemRender,
  listProps,
  onItemClick,
  rowHeight,
  visibleRows,
  width,
  renderInMenu = true,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
SearchItemListProps<any>) => {
  const listRef = useRef<List>(null);

  const listHeight = useMemo(() => {
    if (data) {
      const dataHeight = data.length * rowHeight;

      if (visibleRows) {
        return visibleRows < data.length ? visibleRows * rowHeight : dataHeight;
      }

      if (height) {
        return dataHeight > height ? height : dataHeight;
      }

      return dataHeight;
    }
    return 0;
  }, [data, height, rowHeight, visibleRows]);

  useEffect(() => {
    if (listRef.current && listProps) {
      listRef.current.scrollTo(Math.max(0, listProps.scrollTop || 0));
    }
  }, [listProps]);

  const list = data && (
    <List
      height={listHeight}
      itemCount={data.length}
      itemData={{
        highlight,
        itemRender,
        items: data,
        onItemClick,
      }}
      itemSize={rowHeight}
      ref={listRef}
      style={listStyle}
      width={width}
      {...listProps}
    >
      {rowRenderer}
    </List>
  );

  return renderInMenu ? <Menu tabIndex={-1}>{list}</Menu> : <>{list}</>;
};

export default SearchItems;
