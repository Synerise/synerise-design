import React from 'react';

import Scrollbar from '@synerise/ds-scrollbar';

import * as S from './AutocompleteDropdown.style';
import type { AutocompleteDropdownProps } from './AutocompleteDropdown.types';

const DEFAULT_ROW_HEIGHT = 32;
const DEFAULT_VISIBLE_ROWS = 10;

const AutocompleteDropdown = ({
  options,
  notFoundContent,
  visibleRows = DEFAULT_VISIBLE_ROWS,
  rowHeight = DEFAULT_ROW_HEIGHT,
  onSelect,
}: AutocompleteDropdownProps) => {
  if (options.length === 0) {
    return (
      <S.DropdownWrapper>
        <S.NotFound data-testid="autocomplete-not-found">
          {notFoundContent}
        </S.NotFound>
      </S.DropdownWrapper>
    );
  }

  const maxHeight = Math.min(visibleRows, options.length) * rowHeight;

  return (
    <S.DropdownWrapper>
      {/* ScrollList = ds-list-item ListWrapper (provides ListContextProvider);
          its right padding is dropped so the absolute Scrollbar overlays the
          Inner list's 8px gutter rather than adding space — mirrors
          ds-dropdown's DropdownMenuList. */}
      <S.ScrollList>
        <Scrollbar absolute maxHeight={maxHeight}>
          <S.Inner>
            {options.map((option) => (
              <S.ListItem
                key={option.value}
                role="option"
                data-testid="autocomplete-option"
                text={option.label ?? option.value}
                disabled={option.disabled}
                onClick={() => {
                  if (!option.disabled) {
                    onSelect(option.value);
                  }
                }}
              />
            ))}
          </S.Inner>
        </Scrollbar>
      </S.ScrollList>
    </S.DropdownWrapper>
  );
};

export default AutocompleteDropdown;
