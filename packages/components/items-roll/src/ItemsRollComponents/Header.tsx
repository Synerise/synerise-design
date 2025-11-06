import React, { useMemo } from 'react';

import Dropdown from '@synerise/ds-dropdown';
import Icon, { EditM } from '@synerise/ds-icon';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import { NOOP } from '@synerise/ds-utils';

import Extras from '../Extras';
import * as S from '../ItemsRoll.styles';
import { type HeaderProps } from './Header.types';

const Header = ({
  actions,
  allTexts,
  changeSelectionIcon: ChangeSelectionIcon = EditM,
  changeSelectionDropdownProps,
  customSidebarActions,
  hideSearch,
  itemsCount,
  onChangeSelection,
  onSearch,
  searchValue,
  onSearchClear,
  searchPlaceholder,
}: HeaderProps) => {
  const ChangeSelectionButton = useMemo(
    () => (
      <S.ChangeSelection
        type="ghost"
        mode="icon-label"
        onClick={onChangeSelection}
      >
        <Icon component={<ChangeSelectionIcon />} size={24} />
        {allTexts.changeSelectionLabel}
      </S.ChangeSelection>
    ),
    [ChangeSelectionIcon, onChangeSelection, allTexts.changeSelectionLabel],
  );

  return (
    <S.ContainerSpaceBetween>
      <S.HeaderLeft>{itemsCount}</S.HeaderLeft>
      <S.HeaderRight>
        {onChangeSelection &&
          (changeSelectionDropdownProps ? (
            <Dropdown
              {...changeSelectionDropdownProps}
              popoverProps={{
                testId: 'items-roll-change-selection',
                ...changeSelectionDropdownProps?.popoverProps,
              }}
            >
              {ChangeSelectionButton}
            </Dropdown>
          ) : (
            ChangeSelectionButton
          ))}
        {!hideSearch && (
          <S.SearchWrapper>
            <SearchInput
              clearTooltip={allTexts.searchClearTooltipLabel}
              onClear={onSearchClear || NOOP}
              onChange={onSearch || NOOP}
              placeholder={searchPlaceholder}
              value={searchValue || ''}
              closeOnClickOutside
            />
          </S.SearchWrapper>
        )}
        {customSidebarActions}
        {actions && <Extras actions={actions} />}
      </S.HeaderRight>
    </S.ContainerSpaceBetween>
  );
};

export default Header;
