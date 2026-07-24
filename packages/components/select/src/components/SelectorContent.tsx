import React, {
  type ChangeEvent,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';

import Icon, { CloseS } from '@synerise/ds-icon';

import * as S from '../Select.styles';
import { type RawValueType } from '../Select.types';

type SelectorContentProps = {
  isMultiple: boolean;
  showSearch?: boolean;
  hasValue: boolean;
  placeholder?: ReactNode;
  placeholderStr?: string;
  selectedValues: RawValueType[];
  effectiveQuery: string;
  labelFor: (value: RawValueType) => ReactNode;
  onRemoveValue: (value: RawValueType) => void;

  // ── chip display limits (multiple / tags) ──
  maxTagCount?: number;
  maxTagTextLength?: number;
  maxTagPlaceholder?:
    | ReactNode
    | ((
        omittedValues: Array<{ value: RawValueType; label: ReactNode }>,
      ) => ReactNode);

  // ── in-selector search input (showSearch / multiple / tags) ──
  inputRef: RefObject<HTMLInputElement>;
  isDisabled: boolean;
  hasInput: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  id?: string;
  isOpen: boolean;
  listboxId: string;
  activeIndex: number;
  optionDomId: (index: number) => string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

/** Content rendered inside the selector box: chips / selected label / placeholder + search input. */
export const SelectorContent = ({
  isMultiple,
  showSearch,
  hasValue,
  placeholder,
  placeholderStr,
  selectedValues,
  effectiveQuery,
  labelFor,
  onRemoveValue,
  maxTagCount,
  maxTagTextLength,
  maxTagPlaceholder,
  inputRef,
  isDisabled,
  hasInput,
  autoFocus,
  maxLength,
  id,
  isOpen,
  listboxId,
  activeIndex,
  optionDomId,
  onSearchChange,
  onSearchKeyDown,
}: SelectorContentProps): ReactElement => {
  // Single-select showSearch layers the input over the selected label; multiple
  // and tags keep it inline (flex child) after the chips.
  const isSingleSearch = !!showSearch && !isMultiple;

  const searchInput = (
    <S.SearchInputEl
      ref={inputRef}
      $overlay={isSingleSearch}
      className="ds-select-search"
      value={effectiveQuery}
      onChange={onSearchChange}
      onKeyDown={onSearchKeyDown}
      placeholder={hasValue ? undefined : placeholderStr}
      disabled={isDisabled}
      autoFocus={autoFocus}
      maxLength={maxLength}
      autoComplete="off"
      readOnly={!hasInput}
      id={id}
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={isOpen ? listboxId : undefined}
      aria-activedescendant={
        isOpen && activeIndex >= 0 ? optionDomId(activeIndex) : undefined
      }
    />
  );

  if (isMultiple) {
    const displayedValues =
      typeof maxTagCount === 'number'
        ? selectedValues.slice(0, Math.max(maxTagCount, 0))
        : selectedValues;
    const omittedValues = selectedValues.slice(displayedValues.length);

    // Truncate a string chip label to `maxTagTextLength` (antd parity: adds `...`).
    const chipLabel = (v: RawValueType): ReactNode => {
      const label = labelFor(v);
      if (
        typeof maxTagTextLength === 'number' &&
        typeof label === 'string' &&
        label.length > maxTagTextLength
      ) {
        return `${label.slice(0, maxTagTextLength)}...`;
      }
      return label;
    };

    const overflowContent =
      typeof maxTagPlaceholder === 'function'
        ? maxTagPlaceholder(
            omittedValues.map((v) => ({ value: v, label: labelFor(v) })),
          )
        : (maxTagPlaceholder ?? `+ ${omittedValues.length}`);

    return (
      <S.MultiValueArea>
        {displayedValues.map((v) => (
          <S.Chip key={v} className="ds-select-selection-item">
            <S.ChipLabel className="ds-select-selection-item-label">
              {chipLabel(v)}
            </S.ChipLabel>
            <S.ChipRemove
              className="ds-select-selection-item-remove"
              onMouseDown={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                onRemoveValue(v);
              }}
            >
              <Icon component={<CloseS />} size={24} />
            </S.ChipRemove>
          </S.Chip>
        ))}
        {omittedValues.length > 0 && (
          <S.Chip
            className="ds-select-selection-overflow"
            data-testid="select-tag-overflow"
          >
            <S.ChipLabel className="ds-select-selection-item-label">
              {overflowContent}
            </S.ChipLabel>
          </S.Chip>
        )}
        {searchInput}
      </S.MultiValueArea>
    );
  }

  if (showSearch) {
    return (
      <>
        {hasValue && !effectiveQuery && (
          <S.SelectionItem className="ds-select-selection-item">
            {labelFor(selectedValues[0])}
          </S.SelectionItem>
        )}
        {searchInput}
      </>
    );
  }

  if (hasValue) {
    return (
      <S.SelectionItem className="ds-select-selection-item">
        {labelFor(selectedValues[0])}
      </S.SelectionItem>
    );
  }

  return (
    <S.Placeholder className="ds-select-selection-placeholder">
      {placeholder}
    </S.Placeholder>
  );
};
