import * as React from 'react';
import SearchBar from '@synerise/ds-search-bar';
import Menu from '@synerise/ds-menu';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import Result from '@synerise/ds-result';
import Icon, { SearchM } from '@synerise/ds-icon';
import { SearchItems } from '@synerise/ds-search/dist/Elements';
import * as S from './ItemPickerDropdown.style';
import { Props } from './ItemPickerDropdown.types';

const DEFAULT_ROW_HEIGHT = 32;
const DEFAULT_VISIBLE_ROWS = 10;
const ItemPickerDropdown: React.FC<Props> = ({
  onChange,
  placeholder,
  dataSource,
  closeDropdown,
  noResults,
  dropdownVisibleRows,
  dropdownRowHeight,
  dropdownBottomAction,
  closeOnBottomAction,
  isDropdownOpened,
  searchBarProps,
}) => {
  const rowCount = dropdownVisibleRows || DEFAULT_VISIBLE_ROWS;
  const rowHeight = dropdownRowHeight || DEFAULT_ROW_HEIGHT;
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [scrollTop, setScrollTop] = React.useState<number>(0);
  const handleChange = React.useCallback(
    (item: MenuItemProps) => {
      closeDropdown();
      onChange(item);
    },
    [onChange, closeDropdown]
  );

  const filteredDataSource = React.useMemo(() => {
    return searchQuery
      ? dataSource.filter(
          item =>
            item.text &&
            String(item.text)
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : dataSource;
  }, [searchQuery, dataSource]);

  const renderBottomAction = React.useMemo(() => {
    const bottomAction = !closeOnBottomAction ? (
      dropdownBottomAction
    ) : (
      <S.BottomActionWrapper onClick={closeDropdown}>{dropdownBottomAction}</S.BottomActionWrapper>
    );
    return dropdownBottomAction && <S.DropdownFooter>{bottomAction}</S.DropdownFooter>;
  }, [closeOnBottomAction, dropdownBottomAction, closeDropdown]);

  return (
    <S.DropdownWrapper>
      <SearchBar
        iconLeft={<Icon component={<SearchM />} />}
        onSearchChange={setSearchQuery}
        placeholder={placeholder}
        value={searchQuery}
        onClearInput={(): void => setSearchQuery('')}
        autofocus={isDropdownOpened}
        {...searchBarProps}
      />
      <S.DSMenu>
        {filteredDataSource?.length === 0 && <Result type="no-results" description={noResults} />}
        <S.StyledScrollbar
          maxHeight={rowCount * rowHeight}
          absolute
          onScroll={(e: React.UIEvent): void => setScrollTop(e.currentTarget.scrollTop)}
          style={{ paddingRight: '8px' }}
        >
          <SearchItems
            data={filteredDataSource}
            highlight={searchQuery}
            itemRender={(item: MenuItemProps): JSX.Element => <Menu.Item key={item?.text as string} {...item} />}
            onItemClick={(i): void => handleChange(i)}
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
      {renderBottomAction}
    </S.DropdownWrapper>
  );
};

export default ItemPickerDropdown;
