import React, { UIEvent, useState, useCallback } from 'react';
import ListItem from '@synerise/ds-list-item';
import type { ListItemProps } from '@synerise/ds-list-item';
import { SearchItems } from '@synerise/ds-search/dist/Elements';
import * as S from './SelectDropdown.style';
import { SelectDropdownProps } from './SelectDropdown.types';

const DEFAULT_ROW_HEIGHT = 32;
const DEFAULT_VISIBLE_ROWS = 10;
const SelectDropdown = <ItemType extends ListItemProps>({
  dataSource,
  dropdownVisibleRows,
  dropdownRowHeight,
  onSelect,
  closeDropdown,
  style,
}: SelectDropdownProps<ItemType>) => {
  const rowCount = dropdownVisibleRows || DEFAULT_VISIBLE_ROWS;
  const rowHeight = dropdownRowHeight || DEFAULT_ROW_HEIGHT;
  const [scrollTop, setScrollTop] = useState(0);
  const handleItemClick = useCallback(
    (item: ItemType) => {
      onSelect(item);
      // @ts-ignore TODO expects ItemData from @synerise/ds-list-item
      // eslint-disable-next-line no-unused-expressions
      item.onClick?.(item);
      closeDropdown();
    },
    [onSelect, closeDropdown]
  );

  return (
    <S.DropdownWrapper style={style}>
      <S.ListWrapper>
        <S.StyledScrollbar
          maxHeight={rowCount * rowHeight}
          absolute
          onScroll={(event: UIEvent) => setScrollTop(event.currentTarget.scrollTop)}
        >
          <SearchItems
            data={dataSource}
            // eslint-disable-next-line react/jsx-handler-names
            itemRender={(item: ItemType) => <ListItem key={item?.text as string} {...item} />}
            onItemClick={handleItemClick}
            rowHeight={rowHeight}
            height={rowCount * rowHeight}
            visibleRows={rowCount}
            listProps={{ scrollTop }}
            width="100%"
            renderInMenu={false}
          />
        </S.StyledScrollbar>
      </S.ListWrapper>
    </S.DropdownWrapper>
  );
};

export default SelectDropdown;
