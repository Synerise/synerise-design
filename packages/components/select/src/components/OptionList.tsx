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
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { type ListChildComponentProps, VariableSizeList } from 'react-window';

import Loader from '@synerise/ds-loader';
import Scrollbar from '@synerise/ds-scrollbar';

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
    const rowRef = useRef<HTMLDivElement>(null);

    // Rows take arbitrary JSX, so the estimated height is only a starting point:
    // let the content set the real height, report it, and let the list re-lay out.
    useLayoutEffect(() => {
      const height = rowRef.current?.offsetHeight ?? 0;
      measureRow(index, height);
    });

    // …and content that settles after the first paint (an image, a font swap, a
    // narrower dropdown wrapping a label) never re-renders the row, so it would
    // keep its stale height and overlap its neighbour without this.
    useLayoutEffect(() => {
      const node = rowRef.current;
      if (!node || typeof ResizeObserver === 'undefined') {
        return undefined;
      }
      const observer = new ResizeObserver(() =>
        measureRow(index, node.offsetHeight),
      );
      observer.observe(node);
      return () => observer.disconnect();
    }, [index, measureRow]);

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
  const listRef = useRef<VariableSizeList>(null);
  const scrollRef = useRef<HTMLElement | null>(null);
  /** Mirrors the scroll container's offset (jsdom never reports a real one). */
  const scrollOffsetRef = useRef(0);
  /** Measured row heights, keyed by option so filtering keeps them usable. */
  const sizeCacheRef = useRef(new Map<Key, number>());

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

  const getItemSize = useCallback(
    (index: number): number => {
      const option = options[index];
      if (!option) {
        return rowHeight;
      }
      return sizeCacheRef.current.get(keyFor(option)) ?? rowHeight;
    },
    [options, keyFor, rowHeight],
  );

  const measureRow = useCallback(
    (index: number, height: number): void => {
      const option = options[index];
      // A zero height means "not laid out" (jsdom, display:none) — keep the estimate.
      if (!option || !height) {
        return;
      }
      const key = keyFor(option);
      if (sizeCacheRef.current.get(key) === height) {
        return;
      }
      sizeCacheRef.current.set(key, height);
      // Null on the mount commit alone — rows are descendants of the list, so
      // their layout effects run before its ref is attached. The measurement is
      // still cached and lands on the list's next render, which opening always
      // produces (`Select` highlights the selected option as it opens).
      listRef.current?.resetAfterIndex(index);
    },
    [options, keyFor],
  );

  /**
   * The row estimate changed, so every cached measurement was taken against the
   * old one. Skipped on mount, where the cache already holds the first window's
   * own measurements and clearing would throw them away.
   *
   * Forced, and in a layout effect: react-window memoises row offsets, and the
   * render that brought the new estimate in has already laid out against the old
   * memo. A passive `resetAfterIndex(0, false)` drops that memo without asking
   * for another render, so the stale layout stays on screen until something else
   * happens to re-render the list.
   */
  const prevRowHeightRef = useRef(rowHeight);
  useLayoutEffect(() => {
    if (prevRowHeightRef.current === rowHeight) {
      return;
    }
    prevRowHeightRef.current = rowHeight;
    sizeCacheRef.current.clear();
    listRef.current?.resetAfterIndex(0);
  }, [rowHeight]);

  // A different option list means different offsets (cached heights still apply,
  // which is why the cache is keyed by option). Cap it here rather than evicting
  // per change: pruning on every keystroke would throw away exactly the
  // measurements a narrowing search is about to need again.
  useEffect(() => {
    const cache = sizeCacheRef.current;
    if (cache.size > MAX_MEASURED_ROWS) {
      const live = new Set(options.map(keyFor));
      cache.forEach((_height, key) => {
        if (!live.has(key)) {
          cache.delete(key);
        }
      });
    }
    // Not forced: the rows re-render with the new options anyway, and each one
    // that measures a different height invalidates from its own index.
    listRef.current?.resetAfterIndex(0, false);
  }, [options, keyFor]);

  const scrollTo = useCallback((offset: number): void => {
    scrollOffsetRef.current = offset;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = offset;
    }
    listRef.current?.scrollTo(offset);
  }, []);

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
    [onPopupScroll],
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
