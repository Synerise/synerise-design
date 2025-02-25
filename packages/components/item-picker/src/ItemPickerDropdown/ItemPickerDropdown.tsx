import React, { useState, useMemo, useEffect, UIEvent } from 'react';

import SearchBar from '@synerise/ds-search-bar';
import type { ListItemProps } from '@synerise/ds-list-item';
import Result from '@synerise/ds-result';
import Icon, { SearchM } from '@synerise/ds-icon';
import { SearchItems } from '@synerise/ds-search/dist/Elements';

import * as S from './ItemPickerDropdown.style';
import { ItemPickerDropdownProps } from './ItemPickerDropdown.types';

const DEFAULT_ROW_HEIGHT = 32;
const DEFAULT_VISIBLE_ROWS = 10;
const ItemPickerDropdown = ({
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
  hideSearchBar,
  scrollbarProps,
  clearSearchQuery,
}: ItemPickerDropdownProps) => {
  const rowCount = dropdownVisibleRows || DEFAULT_VISIBLE_ROWS;
  const rowHeight = dropdownRowHeight || DEFAULT_ROW_HEIGHT;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    if (clearSearchQuery && clearSearchQuery > 0) {
      setSearchQuery('');
    }
  }, [clearSearchQuery]);

  const handleClose = () => {
    setSearchQuery('');
    closeDropdown();
  };

  const handleChange = (item: ListItemProps) => {
    handleClose();
    onChange(item);
  };

  const filteredDataSource = useMemo(() => {
    return searchQuery
      ? dataSource.filter(item => item.text && String(item.text).toLowerCase().includes(searchQuery.toLowerCase()))
      : dataSource;
  }, [searchQuery, dataSource]);

  const renderBottomAction = () => {
    const bottomAction = !closeOnBottomAction ? (
      dropdownBottomAction
    ) : (
      <S.BottomActionWrapper onClick={handleClose}>{dropdownBottomAction}</S.BottomActionWrapper>
    );
    return dropdownBottomAction && <S.DropdownFooter>{bottomAction}</S.DropdownFooter>;
  };

  return (
    <S.DropdownWrapper data-testid="ds-item-picker-dropdown">
      {hideSearchBar !== true && (
        <SearchBar
          iconLeft={<Icon component={<SearchM />} />}
          onSearchChange={setSearchQuery}
          placeholder={placeholder}
          value={searchQuery}
          onClearInput={(): void => setSearchQuery('')}
          autofocus={isDropdownOpened}
          {...searchBarProps}
        />
      )}
      <S.ListWrapper>
        {filteredDataSource?.length === 0 && <Result type="no-results" description={noResults} />}
        <S.StyledScrollbar
          maxHeight={rowCount * rowHeight}
          absolute
          onScroll={(event: UIEvent): void => setScrollTop(event.currentTarget.scrollTop)}
          style={{ paddingRight: '8px' }}
          {...scrollbarProps}
        >
          <SearchItems
            data={filteredDataSource}
            highlight={searchBarProps?.value ?? searchQuery}
            itemRender={(item: ListItemProps) => <S.ListItem key={item?.text as string} {...item} />}
            onItemClick={(i): void => handleChange(i)}
            rowHeight={rowHeight}
            height={rowCount * rowHeight}
            visibleRows={rowCount}
            listProps={{ scrollTop }}
            // @ts-ignore
            width="100%"
            renderInMenu={false}
          />
        </S.StyledScrollbar>
      </S.ListWrapper>
      {renderBottomAction()}
    </S.DropdownWrapper>
  );
};

export default ItemPickerDropdown;
