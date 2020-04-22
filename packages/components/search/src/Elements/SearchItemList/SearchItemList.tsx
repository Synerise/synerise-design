import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { List, ListRowProps } from 'react-virtualized';
import Scrollbar from '@synerise/ds-scrollbar';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { SearchItemListProps } from './SearchItemList.types';
import { FilterElement } from '../../Search.types';

const rowRenderer = (
  itemRender: (item: FilterElement) => React.ReactElement,
  onItemClick: undefined | ((e: FilterElement) => void),
  data: FilterElement[],
  highlight: Pick<MenuItemProps,'highlight'> | string | undefined,
) => ({ key, index, style }: ListRowProps,): React.ReactElement => {
  const item = data && data[index];
  const RenderedItem = React.cloneElement(itemRender(item),{key,style,highlight,onClick:()=>onItemClick && onItemClick(item)})
  return RenderedItem;
};

const SearchItemList: React.FC<SearchItemListProps> = ({
  data,
  onItemClick,
  visibleRows,
  rowHeight,
  width,
  highlight,
  divider,
  itemRender,
}: SearchItemListProps) => {
  let listRef: React.MutableRefObject<null | List> | List | null = React.useRef(null);
  const listStyle: React.CSSProperties = { overflowX: 'unset', overflowY: 'unset' };
  const getHeight = (): number => {
    if(data){
      return (data.length > visibleRows ? visibleRows * rowHeight : data.length * rowHeight)
    }
    return 0;
  };
  const handleScroll = ({ currentTarget }: React.SyntheticEvent ): void => {
    const { scrollTop, scrollLeft } = currentTarget;

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { Grid: grid } = listRef;

    grid.handleScrollEvent({ scrollTop, scrollLeft });
  };
  return (
    <>
      <Menu>
        {data && (
          <Scrollbar onScroll={handleScroll}>
            <List
              height={getHeight()}
              width={width}
              style={listStyle}
              rowHeight={rowHeight}
              ref={(instance): (List | null) => (listRef = instance)}
              rowRenderer={rowRenderer(itemRender,onItemClick,data,highlight)}
              rowCount={data.length}
            />
          </Scrollbar>
        )}
      </Menu>
      {!!divider && divider}
    </>
  );
};

export default SearchItemList;
