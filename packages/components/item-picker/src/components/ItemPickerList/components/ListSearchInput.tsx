import React, {
  type KeyboardEvent,
  type MutableRefObject,
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useTheme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';
import type { SearchBarProps } from '@synerise/ds-search-bar';

import type {
  ItemPickerTexts,
  SearchActionType,
  SearchParamConfig,
} from '../../ItemPickerNew/ItemPickerNew.types';
import * as S from '../ItemPickerList.styles';

const CLEAR_TOOLTIP_PROPS = {
  shortCuts: 'ESC',
};

type ListSearchInputProps = {
  searchParamConfig?: SearchParamConfig;
  searchActionSection?: SearchActionType;
  clearSearchQuery: () => void;
  setSearchParamConfig: (
    searchParamConfig: SearchParamConfig | undefined,
  ) => void;
  debouncedChangeSearchQuery: (value: string) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  changeLocalSearchQueryRef: MutableRefObject<((value: string) => void) | null>;
  searchBarProps?: Omit<
    SearchBarProps,
    'value' | 'onSearchChange' | 'placeholder'
  >;
  allTexts: ItemPickerTexts;
};

export const ListSearchInput = ({
  searchParamConfig,
  searchActionSection,
  changeLocalSearchQueryRef,
  clearSearchQuery,
  setSearchParamConfig,
  debouncedChangeSearchQuery,
  searchBarProps,
  allTexts,
  inputRef,
}: ListSearchInputProps) => {
  const theme = useTheme();

  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const isSearchParamOrSearchSectionActive = Boolean(
    searchParamConfig || searchActionSection,
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setLocalSearchQuery(value);
      debouncedChangeSearchQuery(value);
    },
    [debouncedChangeSearchQuery],
  );

  const handleInputRef = useCallback(
    (ref: RefObject<HTMLInputElement | null>) => {
      const localRef = inputRef;
      localRef.current = ref.current;
    },
    [inputRef],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' && !localSearchQuery) {
      setSearchParamConfig(undefined);
    }
  };

  const handleClearInput = () => {
    if (localSearchQuery) {
      clearSearchQuery();
      return;
    }
    setSearchParamConfig(undefined);
  };

  useEffect(() => {
    const ref = changeLocalSearchQueryRef;
    ref.current = setLocalSearchQuery;
  }, [changeLocalSearchQueryRef]);

  return (
    <S.SearchWrapper data-testid="search-wrapper">
      <Dropdown.SearchInput
        iconLeft={
          <Icon
            component={searchParamConfig?.icon || <SearchM />}
            color={theme.palette['grey-600']}
          />
        }
        placeholder={
          isSearchParamOrSearchSectionActive
            ? allTexts.basicSearchPlaceholder
            : allTexts.searchPlaceholder
        }
        {...searchBarProps}
        valuePrefix={searchParamConfig?.paramKeyLabel}
        onKeyDown={handleKeyDown}
        clearTooltip={allTexts.clearSearchTooltip}
        clearTooltipProps={CLEAR_TOOLTIP_PROPS}
        onClearInput={handleClearInput}
        handleInputRef={handleInputRef}
        onSearchChange={handleSearchChange}
        value={localSearchQuery}
      />
    </S.SearchWrapper>
  );
};
