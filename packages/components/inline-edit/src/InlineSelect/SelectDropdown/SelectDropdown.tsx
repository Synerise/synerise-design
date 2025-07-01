import React, { type UIEvent, useCallback, useState } from 'react';

import type { ListItemProps } from '@synerise/ds-list-item';
import { SearchItems } from '@synerise/ds-search';

import * as S from './SelectDropdown.style';
import { type SelectDropdownProps } from './SelectDropdown.types';

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
      // @ts-expect-error Argument of type 'ItemType' is not assignable to parameter of type 'ItemData<MouseEvent<HTMLDivElement, MouseEvent>>
      item.onClick?.(item);
      closeDropdown();
    },
    [onSelect, closeDropdown],
  );

  return (
    <S.DropdownWrapper style={style}>
      <S.ListWrapper>
        <S.StyledScrollbar
          maxHeight={rowCount * rowHeight}
          absolute
          onScroll={(event: UIEvent) =>
            setScrollTop(event.currentTarget.scrollTop)
          }
        >
          <SearchItems
            data={dataSource}
            itemRender={(item: ItemType) => (
              <S.ListItem key={item?.text as string} {...item} />
            )}
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
