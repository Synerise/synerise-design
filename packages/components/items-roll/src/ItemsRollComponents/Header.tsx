import * as React from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import Icon from '@synerise/ds-icon';
import EditM from '@synerise/ds-icon/dist/icons/EditM';

import * as S from '../ItemsRoll.styles';
import Extras from '../Extras';
import { ItemsRollProps, Texts } from '../ItemsRoll.types';

type HeaderProps = Pick<
  ItemsRollProps,
  | 'actions'
  | 'changeSelectionIcon'
  | 'onChangeSelection'
  | 'onSearch'
  | 'onSearchClear'
  | 'searchValue'
  | 'searchPlaceholder'
> & {
  allTexts: { [k in Texts]: string | React.ReactNode };
  itemsCount: number;
};

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
            onValueChange={onSearch}
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
