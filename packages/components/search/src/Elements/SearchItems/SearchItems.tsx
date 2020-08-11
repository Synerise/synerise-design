import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
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

type ItemData<T extends unknown> = {
  itemRender: (item: T) => React.ReactElement;
  onItemClick: undefined | ((e: T) => void);
  items: T[];
  highlight: Pick<MenuItemProps, 'highlight'> | string | undefined;
};

const rowRenderer = ({
  index,
  style,
  data,
}: Omit<ListChildComponentProps, 'data'> & { data: ItemData<Record<string, unknown>> }): React.ReactElement => {
  const item = data && data.items[index];
  const itemReturnedFromRenderer = data.itemRender(item);
  const rendererCustomStyles =
    (itemReturnedFromRenderer && itemReturnedFromRenderer.props && itemReturnedFromRenderer.props.style) || {};
  const mergedStyles = { ...rendererCustomStyles, ...style };

  return React.cloneElement(itemReturnedFromRenderer, {
    ...itemReturnedFromRenderer.props,
    style: mergedStyles,
    highlight: data.highlight,
    onClick: () => data.onItemClick && data.onItemClick(item),
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
  const listRef = React.useRef<List>(null);

  const getHeight = React.useCallback((): number => {
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

  React.useEffect(() => {
    if (listRef.current && listProps) {
      listRef.current.scrollTo(Math.max(0, listProps.scrollTop || 0));
    }
  }, [listProps]);
  return (
    <Menu>
      {data && (
        <List
          height={getHeight()}
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
      )}
    </Menu>
  );
};

export default SearchItems;
