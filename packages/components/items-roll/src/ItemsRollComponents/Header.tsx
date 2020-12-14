import * as React from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import EditM from '@synerise/ds-icon/dist/icons/EditM';

import Extras from '../Extras';
import { HeaderProps } from './Header.types';
import * as S from '../ItemsRoll.styles';

const Header: React.FC<HeaderProps> = ({
  actions,
  allTexts,
  changeSelectionIcon: ChangeSelectionIcon = EditM,
  changeSelectionDropdownProps,
  itemsCount,
  onChangeSelection,
  onSearch,
  searchValue,
  onSearchClear,
  searchPlaceholder,
}) => {
  const ChangeSelectionButton = React.useMemo(
    () => (
      <S.ChangeSelection type="ghost" mode="icon-label" onClick={onChangeSelection}>
        <Icon component={<ChangeSelectionIcon />} size={24} />
        {allTexts.changeSelectionLabel}
      </S.ChangeSelection>
    ),
    [onChangeSelection, allTexts.changeSelectionLabel]
  );

  return (
    <S.ContainerSpaceBetween>
      <S.HeaderLeft>
        {allTexts.itemsLabel}: <S.Bold>{itemsCount}</S.Bold>
      </S.HeaderLeft>
      <S.HeaderRight>
        {onChangeSelection &&
          (changeSelectionDropdownProps ? (
            <Dropdown {...changeSelectionDropdownProps}>{ChangeSelectionButton}</Dropdown>
          ) : (
            ChangeSelectionButton
          ))}
        <S.SearchWrapper>
          <SearchInput
            clearTooltip={allTexts.searchClearTooltipLabel}
            onClear={onSearchClear}
            onChange={onSearch}
            placeholder={searchPlaceholder}
            value={searchValue}
            closeOnClickOutside
          />
        </S.SearchWrapper>
        {actions && <Extras actions={actions} />}
      </S.HeaderRight>
    </S.ContainerSpaceBetween>
  );
};

export default Header;
