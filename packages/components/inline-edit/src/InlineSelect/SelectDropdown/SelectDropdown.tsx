import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { SearchItems } from '@synerise/ds-search/dist/Elements';
import * as S from './SelectDropdown.style';
import { Props } from './SelectDropdown.types';

const DEFAULT_ROW_HEIGHT = 32;
const DEFAULT_VISIBLE_ROWS = 10;
const SelectDropdown: React.FC<Props> = ({
  dataSource,
  dropdownVisibleRows,
  dropdownRowHeight,
  onSelect,
  closeDropdown,
  style,
}) => {
  const rowCount = dropdownVisibleRows || DEFAULT_VISIBLE_ROWS;
  const rowHeight = dropdownRowHeight || DEFAULT_ROW_HEIGHT;
  const [scrollTop, setScrollTop] = React.useState<number>(0);
  const handleChange = React.useCallback(
    (item: MenuItemProps) => {
      onSelect(item);
      closeDropdown();
    },
    [onSelect, closeDropdown]
  );

  return (
    <S.DropdownWrapper style={style}>
      <S.DSMenu>
        <S.StyledScrollbar
          maxHeight={rowCount * rowHeight}
          absolute
          onScroll={(e: React.UIEvent): void => setScrollTop(e.currentTarget.scrollTop)}
        >
          <SearchItems
            data={dataSource}
            itemRender={(item: MenuItemProps): JSX.Element => <Menu.Item key={item?.text as string} {...item} />}
            onItemClick={(i: MenuItemProps): void => handleChange(i)}
            rowHeight={rowHeight}
            height={rowCount * rowHeight}
            visibleRows={rowCount}
            listProps={{ scrollTop }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            width="100%"
          />
        </S.StyledScrollbar>
      </S.DSMenu>
    </S.DropdownWrapper>
  );
};

export default SelectDropdown;
