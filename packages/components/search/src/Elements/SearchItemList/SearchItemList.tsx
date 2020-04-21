import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { List, ListRowProps } from 'react-virtualized';
import { ReactElement } from 'react';
import Icon from '@synerise/ds-icon';
import { SearchItemListProps } from './SearchItemList.types';
import { FilterElement } from '../../Search.types';

const rowRenderer = (onItemClick: (e: FilterElement) => void, data: FilterElement[], highlight: string | undefined, withIcon: boolean | undefined) => ({ key, index, style }: ListRowProps): ReactElement => {
  const item = data && data[index];
  return (
    <Menu.Item
      key={key}
      prefixel={withIcon && <Icon component={item && item.icon} />}
      style={style}
      onClick={(): void => item && onItemClick && onItemClick(item)}
      highlight={highlight || ''}
      /* eslint-disable-next-line @typescript-eslint/no-empty-function */
      onItemHover={(): void => {}}
    >
      {item && item.text}
    </Menu.Item>
  );
};

const SearchItemList: React.FC<SearchItemListProps> = ({
  data,
  onItemClick,
  visibleRows,
  rowHeight,
  width,
  divider,
  highlight,
  withIcon,
}: SearchItemListProps) => {
  return (
    <Menu>
      {data && onItemClick && <List
        width={width}
        height={data.length > visibleRows ? visibleRows * rowHeight : data.length * rowHeight}
        rowCount={(data && data.length) || 0}
        rowHeight={rowHeight}
        rowRenderer={rowRenderer(onItemClick, data, highlight, withIcon)}
      />}
      {!!divider && divider}
    </Menu>
  );
};

export default SearchItemList;
