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

import type { ItemPickerTexts } from '../../ItemPickerNew/ItemPickerNew.types';
import type { SearchByParamConfig } from '../../ItemPickerNew/types/actions.types';
import * as S from '../ItemPickerList.styles';

const CLEAR_TOOLTIP_PROPS = {
  shortCuts: 'ESC',
};

type ListSearchInputProps = {
  searchByParamConfig?: SearchByParamConfig;
  clearSearchQuery: () => void;
  setSearchByParamConfig: (
    searchByParamConfig: SearchByParamConfig | undefined,
  ) => void;
  debouncedChangeSearchQuery: (value: string) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  changeLocalSearchQueryRef: MutableRefObject<((value: string) => void) | null>;
  searchBarProps?: Omit<
    SearchBarProps,
    'value' | 'onSearchChange' | 'placeholder'
  >;
  allTexts: ItemPickerTexts;
  canPerformListActions: boolean;
};

export const ListSearchInput = ({
  searchByParamConfig,
  changeLocalSearchQueryRef,
  clearSearchQuery,
  setSearchByParamConfig,
  debouncedChangeSearchQuery,
  searchBarProps,
  allTexts,
  inputRef,
  canPerformListActions,
}: ListSearchInputProps) => {
  const theme = useTheme();

  const [localSearchQuery, setLocalSearchQuery] = useState('');

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
      setSearchByParamConfig(undefined);
    }
  };

  const handleClearInput = () => {
    if (localSearchQuery) {
      clearSearchQuery();
      return;
    }
    setSearchByParamConfig(undefined);
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
            component={searchByParamConfig?.icon || <SearchM />}
            color={theme.palette['grey-600']}
          />
        }
        placeholder={
          canPerformListActions
            ? allTexts.searchPlaceholder
            : allTexts.basicSearchPlaceholder
        }
        {...searchBarProps}
        valuePrefix={searchByParamConfig?.paramKeyLabel}
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
