import React, { useLayoutEffect, useRef, useState } from 'react';

import Scrollbar from '@synerise/ds-scrollbar';

import * as S from './AutocompleteDropdown.style';
import type { AutocompleteDropdownProps } from './AutocompleteDropdown.types';

const DEFAULT_VISIBLE_ROWS = 10;

const AutocompleteDropdown = ({
  options,
  notFoundContent,
  visibleRows = DEFAULT_VISIBLE_ROWS,
  onSelect,
}: AutocompleteDropdownProps) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);

  // Rows are content-sized: a custom `label` (avatar, second line) is far taller than
  // a plain one, so the cap has to come from measured rows. Assuming a fixed row
  // height clipped every list whose options rendered taller than it.
  useLayoutEffect(() => {
    const rows = Array.from(innerRef.current?.children ?? []) as HTMLElement[];
    const next =
      rows.length > visibleRows
        ? rows
            .slice(0, visibleRows)
            .reduce((total, row) => total + row.offsetHeight, 0)
        : undefined;
    setMaxHeight((current) => (current === next ? current : next));
  }, [options, visibleRows]);

  if (options.length === 0) {
    return (
      <S.DropdownWrapper>
        <S.NotFound data-testid="autocomplete-not-found">
          {notFoundContent}
        </S.NotFound>
      </S.DropdownWrapper>
    );
  }

  return (
    <S.DropdownWrapper>
      {/* ScrollList = ds-list-item ListWrapper (provides ListContextProvider);
          its right padding is dropped so the absolute Scrollbar overlays the
          Inner list's 8px gutter rather than adding space — mirrors
          ds-dropdown's DropdownMenuList. */}
      <S.ScrollList>
        <Scrollbar absolute maxHeight={maxHeight}>
          <S.Inner ref={innerRef}>
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
