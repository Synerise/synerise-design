import React, {
  type Key,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type UIEvent,
} from 'react';

import Loader from '@synerise/ds-loader';
import Scrollbar from '@synerise/ds-scrollbar';

import * as S from '../Select.styles';
import { type RawValueType, type SelectOption } from '../Select.types';
import { DEFAULT_LIST_HEIGHT, cx } from '../utils/helpers';

type OptionListProps = {
  loading?: boolean;
  /** Options to render (already filtered / with the tags create-row). */
  options: SelectOption[];
  notFoundContent?: ReactNode;
  listHeight?: number | string;
  isMultiple: boolean;
  listboxId: string;
  selectedValues: RawValueType[];
  /** Keyboard-highlighted option index. */
  activeIndex: number;
  rowKey?: (option: SelectOption) => Key;
  optionDomId: (index: number) => string;
  onOptionActivate: (index: number) => void;
  onOptionSelect: (option: SelectOption) => void;
  /** antd parity: fired as the option list scrolls (e.g. to page in more options). */
  onPopupScroll?: (event: UIEvent<HTMLDivElement>) => void;
};

/** The dropdown overlay: loading / empty / the scrollable listbox of options. */
export const OptionList = ({
  loading,
  options,
  notFoundContent,
  listHeight,
  isMultiple,
  listboxId,
  selectedValues,
  activeIndex,
  rowKey,
  optionDomId,
  onOptionActivate,
  onOptionSelect,
  onPopupScroll,
}: OptionListProps): ReactElement => (
  <S.DropdownWrapper
    onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
      // Keep DOM focus on the trigger/input so interacting with the popup
      // (selecting an option, scrolling) isn't treated as a blur of the select.
      const target = event.target as HTMLElement;
      if (!target.closest('input, textarea, [contenteditable="true"]')) {
        event.preventDefault();
      }
    }}
  >
    {loading ? (
      <S.Loading className="ds-select-loading">
        <Loader size="M" />
      </S.Loading>
    ) : options.length === 0 ? (
      <S.NotFound className="ds-select-empty">{notFoundContent}</S.NotFound>
    ) : (
      <S.ScrollList>
        <Scrollbar
          absolute
          maxHeight={Number(listHeight) || DEFAULT_LIST_HEIGHT}
          onScroll={
            onPopupScroll
              ? (event: UIEvent) =>
                  onPopupScroll(event as UIEvent<HTMLDivElement>)
              : undefined
          }
        >
          <S.Inner
            role="listbox"
            id={listboxId}
            aria-multiselectable={isMultiple || undefined}
          >
            {options.map((option, index) => {
              const isSelected = selectedValues.includes(option.value);
              // antd parity: forward per-option data-*/aria-* onto the row. Spread
              // last so a consumer's own `data-testid` overrides the DS default.
              const optionAttrs = Object.fromEntries(
                Object.entries(option).filter(
                  ([key]) => key.startsWith('data-') || key.startsWith('aria-'),
                ),
              );
              return (
                <S.OptionItem
                  key={rowKey ? rowKey(option) : option.value}
                  id={optionDomId(index)}
                  role="option"
                  className={cx(
                    'ds-select-item-option',
                    isSelected && 'ds-select-item-option-selected',
                    index === activeIndex && 'ds-select-item-option-active',
                  )}
                  selected={isSelected}
                  aria-selected={isSelected}
                  data-testid="select-option"
                  title={
                    typeof option.title === 'string' ? option.title : undefined
                  }
                  text={option.label ?? option.value}
                  style={option.style}
                  disabled={option.disabled}
                  onMouseEnter={() => onOptionActivate(index)}
                  onClick={() => onOptionSelect(option)}
                  {...optionAttrs}
                />
              );
            })}
          </S.Inner>
        </Scrollbar>
      </S.ScrollList>
    )}
  </S.DropdownWrapper>
);
