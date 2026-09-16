import React, {
  type CSSProperties,
  type HTMLAttributes,
  type Key,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type UIEvent,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { type ListChildComponentProps, VariableSizeList } from 'react-window';

import Loader from '@synerise/ds-loader';
import Scrollbar from '@synerise/ds-scrollbar';
import { useMeasuredRow, useMeasuredRowHeights } from '@synerise/ds-utils';

import * as S from '../Select.styles';
import { type RawValueType, type SelectOption } from '../Select.types';
import {
  DEFAULT_LIST_HEIGHT,
  DEFAULT_LIST_ITEM_HEIGHT,
  MAX_MEASURED_ROWS,
  OVERSCAN_COUNT,
  cx,
} from '../utils/helpers';

/** Scrolling belongs to the surrounding `Scrollbar`, not to the window itself. */
const LIST_STYLE: CSSProperties = { overflowX: 'unset', overflowY: 'unset' };

type OptionListProps = {
  loading?: boolean;
  /** Options to render (already filtered / with the tags create-row). */
  options: SelectOption[];
  notFoundContent?: ReactNode;
  listHeight?: number | string;
  /** Estimated height of one option row; measured rows override it. */
  listItemHeight?: number;
  isMultiple: boolean;
  listboxId: string;
  selectedValues: RawValueType[];
  /** Keyboard-highlighted option index. */
  activeIndex: number;
  /** Current query — a change scrolls the window back to the top. */
  searchQuery: string;
  rowKey?: (option: SelectOption) => Key;
  optionDomId: (index: number) => string;
  onOptionActivate: (index: number) => void;
  onOptionSelect: (option: SelectOption) => void;
  /** antd parity: fired as the option list scrolls (e.g. to page in more options). */
  onPopupScroll?: (event: UIEvent<HTMLDivElement>) => void;
};

type RowData = {
  options: SelectOption[];
  selectedValues: RawValueType[];
  activeIndex: number;
  optionDomId: (index: number) => string;
  onOptionActivate: (index: number) => void;
  onOptionSelect: (option: SelectOption) => void;
  measureRow: (index: number, height: number) => void;
};

/**
 * react-window's own wrappers sit between the listbox and its options, so they are
 * marked presentational to keep `listbox` → `option` ownership intact for AT.
 */
const PresentationDiv = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} role="presentation" {...props} />);
PresentationDiv.displayName = 'SelectListWrapper';

/** One windowed option row: react-window's offset + the `ds-list-item` itself. */
const OptionRow = memo(
  ({ index, style, data }: ListChildComponentProps<RowData>): ReactElement => {
    const {
      options,
      selectedValues,
      activeIndex,
      optionDomId,
      onOptionActivate,
      onOptionSelect,
      measureRow,
    } = data;
    const option = options[index];
    // Rows take arbitrary JSX, so the estimated height is only a starting point: the row
    // reports what it actually measures and the list re-lays out around it.
    const rowRef = useMeasuredRow<HTMLDivElement>(index, measureRow);

    const isSelected = selectedValues.includes(option.value);
    // antd parity: forward per-option data-*/aria-* onto the row. Spread last so a
    // consumer's own `data-testid` overrides the DS default.
    const optionAttrs = Object.fromEntries(
      Object.entries(option).filter(
        ([key]) => key.startsWith('data-') || key.startsWith('aria-'),
      ),
    );

    return (
      <S.VirtualRow
        ref={rowRef}
        // Presentational for the same reason as `PresentationDiv`: this wrapper
        // sits between the listbox and its option and must not own the row.
        role="presentation"
        style={{ ...style, height: 'auto', minHeight: style.height }}
      >
        <S.OptionItem
          id={optionDomId(index)}
          role="option"
          className={cx(
            'ds-select-item-option',
            isSelected && 'ds-select-item-option-selected',
            index === activeIndex && 'ds-select-item-option-active',
          )}
          selected={isSelected}
          aria-selected={isSelected}
          // Only the visible window is mounted, so AT cannot count the set from
          // the DOM the way it could before the list was windowed.
          aria-setsize={options.length}
          aria-posinset={index + 1}
          data-testid="select-option"
          title={typeof option.title === 'string' ? option.title : undefined}
          // antd parity: the dropdown row renders the option's children; `label` is
          // the selector display (see `optionLabelProp`) and only stands in for the
          // row when there are no children (options-as-data).
          text={option.children ?? option.label ?? option.value}
          style={option.style}
          disabled={option.disabled}
          onMouseEnter={() => onOptionActivate(index)}
          onClick={() => onOptionSelect(option)}
          {...optionAttrs}
        />
      </S.VirtualRow>
    );
  },
);
OptionRow.displayName = 'SelectOptionRow';

/** The dropdown overlay: loading / empty / the windowed listbox of options. */
export const OptionList = ({
  loading,
  options,
  notFoundContent,
  listHeight,
  listItemHeight,
  isMultiple,
  listboxId,
  selectedValues,
  activeIndex,
  searchQuery,
  rowKey,
  optionDomId,
  onOptionActivate,
  onOptionSelect,
  onPopupScroll,
}: OptionListProps): ReactElement => {
  const scrollRef = useRef<HTMLElement | null>(null);
  /** Mirrors the scroll container's offset (jsdom never reports a real one). */
  const scrollOffsetRef = useRef(0);

  const windowHeight = Number(listHeight) || DEFAULT_LIST_HEIGHT;
  const rowHeight =
    listItemHeight && listItemHeight > 0
      ? listItemHeight
      : DEFAULT_LIST_ITEM_HEIGHT;

  const keyFor = useCallback(
    (option: SelectOption): Key =>
      rowKey ? rowKey(option) : (option.key ?? option.value),
    [rowKey],
  );

  /** Option identity per index, so measurements survive filtering. */
  const rowKeys = useMemo(() => options.map(keyFor), [options, keyFor]);
  const estimateRowHeight = useCallback(() => rowHeight, [rowHeight]);

  const { listRef, getItemSize, measureRow } = useMeasuredRowHeights<
    Key,
    VariableSizeList<RowData>
  >({
    keys: rowKeys,
    estimate: estimateRowHeight,
    // `listItemHeight` can change under a stable option list; every cached
    // measurement was taken against the old value, so they all have to go.
    estimateVersion: rowHeight,
    maxCachedRows: MAX_MEASURED_ROWS,
  });

  const scrollTo = useCallback(
    (offset: number): void => {
      scrollOffsetRef.current = offset;
      if (scrollRef.current) {
        scrollRef.current.scrollTop = offset;
      }
      listRef.current?.scrollTo(offset);
    },
    [listRef],
  );

  // A new query rebuilds the list: go back to the top so no stale rows show through
  // (remote search feeds `options` asynchronously, after the query has changed).
  const isFirstQuery = useRef(true);
  useEffect(() => {
    if (isFirstQuery.current) {
      isFirstQuery.current = false;
      return;
    }
    scrollTo(0);
  }, [searchQuery, scrollTo]);

  // Keep the keyboard-highlighted option inside the window — it may not be mounted,
  // so this scrolls by computed offset rather than `scrollIntoView`.
  useEffect(() => {
    if (activeIndex < 0 || activeIndex >= options.length) {
      return;
    }
    let top = 0;
    for (let index = 0; index < activeIndex; index += 1) {
      top += getItemSize(index);
    }
    const bottom = top + getItemSize(activeIndex);
    const viewport = scrollRef.current?.clientHeight || windowHeight;
    const current = scrollOffsetRef.current;
    let next = current;
    if (top < current) {
      next = top;
    } else if (bottom > current + viewport) {
      next = bottom - viewport;
    }
    if (next !== current) {
      scrollTo(Math.max(0, next));
    }
  }, [activeIndex, options, getItemSize, windowHeight, scrollTo]);

  const handleScroll = useCallback(
    (event: UIEvent): void => {
      const { scrollTop } = event.currentTarget as HTMLElement;
      scrollOffsetRef.current = scrollTop;
      listRef.current?.scrollTo(scrollTop);
      onPopupScroll?.(event as UIEvent<HTMLDivElement>);
    },
    [listRef, onPopupScroll],
  );

  const itemData = useMemo<RowData>(
    () => ({
      options,
      selectedValues,
      activeIndex,
      optionDomId,
      onOptionActivate,
      onOptionSelect,
      measureRow,
    }),
    [
      options,
      selectedValues,
      activeIndex,
      optionDomId,
      onOptionActivate,
      onOptionSelect,
      measureRow,
    ],
  );

  return (
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
            maxHeight={windowHeight}
            onScroll={handleScroll}
            ref={scrollRef}
          >
            <S.Inner
              role="listbox"
              id={listboxId}
              aria-multiselectable={isMultiple || undefined}
              $maxHeight={windowHeight}
            >
              <VariableSizeList
                ref={listRef}
                className="ds-select-option-list"
                width="100%"
                height={windowHeight}
                itemCount={options.length}
                itemSize={getItemSize}
                // Without this react-window sizes rows it has not reached yet at
                // its own 50px default, so the scroll range starts overlong and
                // shrinks as you scroll — the row estimate is the honest guess.
                estimatedItemSize={rowHeight}
                itemData={itemData}
                itemKey={(index: number, data: RowData) =>
                  keyFor(data.options[index])
                }
                overscanCount={OVERSCAN_COUNT}
                outerElementType={PresentationDiv}
                innerElementType={PresentationDiv}
                style={LIST_STYLE}
              >
                {OptionRow}
              </VariableSizeList>
            </S.Inner>
          </Scrollbar>
        </S.ScrollList>
      )}
    </S.DropdownWrapper>
  );
};
