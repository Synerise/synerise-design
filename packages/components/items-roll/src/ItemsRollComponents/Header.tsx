import * as React from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import Icon from '@synerise/ds-icon';
import EditM from '@synerise/ds-icon/dist/icons/EditM';

import * as S from '../ItemsRoll.styles';
import Extras from '../Extras';
import { HeaderProps } from './Header.types';

const Header: React.FC<HeaderProps> = ({
  actions,
  allTexts,
  changeSelectionIcon: ChangeSelectionIcon = EditM,
  itemsCount,
  onChangeSelection,
  onSearch,
  onSearchClear,
  searchValue,
  searchPlaceholder,
}) => {
  return (
    <S.ContainerSpaceBetween>
      <S.HeaderLeft>
        {allTexts.itemsLabel}: <S.Bold>{itemsCount}</S.Bold>
      </S.HeaderLeft>
      <S.HeaderRight>
        {onChangeSelection && (
          <S.ChangeSelection type="ghost" mode="icon-label" onClick={onChangeSelection}>
            <Icon component={<ChangeSelectionIcon />} size={24} />
            {allTexts.changeSelectionLabel}
          </S.ChangeSelection>
        )}
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
