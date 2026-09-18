import React, {
  type Key,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { type ListChildComponentProps, VariableSizeList } from 'react-window';

import { SearchNoResultsL } from '@synerise/ds-icon';
import {
  LIST_ITEM_SIZE_MAPPING,
  type ListItemProps,
  itemSizes,
  itemTypes,
} from '@synerise/ds-list-item';
import Scrollbar from '@synerise/ds-scrollbar';
import { useMeasuredRow, useMeasuredRowHeights } from '@synerise/ds-utils';

import { MAX_VISIBLE_ITEMS, SCROLLBAR_OFFSET } from '../../Dropdown.const';
import * as S from './DropdownMenuList.styles';
import { type DropdownMenuListProps } from './DropdownMenuList.types';

/** A divider is not a row and does not read `size`; it is always 1px plus its margins. */
const DIVIDER_HEIGHT = 17;

/**
 * Closing is deferred by a tick so the item's own `onClick` finishes before the overlay unmounts
 * the row it was fired from.
 */
const CLOSE_DELAY = 10;

type RowData<ItemType extends ListItemProps> = {
  dataSource: ItemType[];
  onItemClick: () => void;
  measureRow: (index: number, height: number) => void;
};

/**
 * One windowed row: react-window's absolute offset wrapper plus the `ds-list-item`.
 *
 * `height: auto` with the offset height as a floor is what lets a `size="auto"` row be
 * taller than the estimate — react-window's own inline `height` would otherwise pin it
 * back. The row reports what it actually measures so the list re-lays out around it.
 */
const DropdownRow = <ItemType extends ListItemProps>({
  index,
  style,
  data,
}: ListChildComponentProps<RowData<ItemType>>) => {
  const { dataSource, onItemClick, measureRow } = data;
  const item = dataSource[index];
  const rowRef = useMeasuredRow<HTMLDivElement>(index, measureRow);

  return (
    <div
      ref={rowRef}
      style={{ ...style, height: 'auto', minHeight: style.height }}
    >
      {item.type === itemTypes.DIVIDER ? (
        <S.DropdownMenuListItem {...item} />
      ) : (
        <S.DropdownMenuListItem
          {...item}
          itemKey={item.key}
          onClick={(itemData) => {
            item.onClick?.(itemData);
            onItemClick();
          }}
        />
      )}
    </div>
  );
};

export const DropdownMenuList = <ItemType extends ListItemProps>({
  dataSource,
  maxVisibleItems = MAX_VISIBLE_ITEMS,
  hideOnItemClick,
  virtualised,
  closeOverlay,
  texts,
}: DropdownMenuListProps<ItemType>) => {
  const getEstimatedItemSize = useCallback(
    (index: number) => {
      const item = dataSource[index];
      return item.type === itemTypes.DIVIDER
        ? DIVIDER_HEIGHT
        : LIST_ITEM_SIZE_MAPPING[item.size || itemSizes.DEFAULT];
    },
    [dataSource],
  );

  /**
   * Row identity, so a measurement survives the list being rebuilt. `key`/`itemKey` is the
   * caller's stable id where there is one; the index is the honest fallback, which means an
   * unkeyed list re-measures after a reorder rather than showing a stale height.
   */
  const rowKeys = useMemo<Key[]>(
    () => dataSource.map((item, index) => item.key ?? item.itemKey ?? index),
    [dataSource],
  );

  const { listRef, getItemSize, measureRow, measurementVersion } =
    useMeasuredRowHeights<Key, VariableSizeList<RowData<ItemType>>>({
      keys: rowKeys,
      estimate: getEstimatedItemSize,
    });

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleItemClick = useCallback(() => {
    if (hideOnItemClick) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = setTimeout(() => {
        closeOverlay();
      }, CLOSE_DELAY);
    }
  }, [hideOnItemClick, closeOverlay]);

  /**
   * The list can go before the timer does — the consumer unmounts, or something else closes the
   * overlay first — and a pending close then calls `closeOverlay` on a tree that is no longer
   * there. In a browser that is a harmless no-op state update; under jsdom the document may
   * already be gone, and React's scheduler reaches for `window` and throws, which a test runner
   * reports as an unhandled error against whatever happened to be running at the time.
   */
  useEffect(() => () => clearTimeout(closeTimeoutRef.current), []);

  /**
   * `getItemSize` returns measured heights once rows have reported them, so this total
   * grows to the real content height instead of the estimate. It is recomputed on every
   * render, which a measurement triggers via `resetAfterIndex`.
   *
   * `hasAutoItem` is the escape hatch for the unvirtualised branch, where nothing measures:
   * capping `maxHeight` at 7 * 32px would make a menu of wrapped rows scroll almost
   * immediately, so the cap is dropped instead of guessed.
   */
  const { listHeight, listMaxHeight, hasAutoItem } = useMemo(() => {
    let height = 0;
    let maxHeight = 0;
    let visibleItems = 0;
    let auto = false;
    dataSource.forEach((item, index) => {
      const itemHeight = getItemSize(index);
      height += itemHeight;
      if (visibleItems < maxVisibleItems) {
        maxHeight += itemHeight;
      }
      if (item.type !== itemTypes.DIVIDER) {
        visibleItems += 1;
      }
      if (item.size === itemSizes.AUTO) {
        auto = true;
      }
    });
    return {
      listHeight: height,
      listMaxHeight: maxHeight,
      hasAutoItem: auto,
    };
    // measurementVersion: the totals above are derived from getItemSize, and a measurement
    // re-renders the list, not this parent.
  }, [dataSource, getItemSize, maxVisibleItems, measurementVersion]);

  const itemData = useMemo<RowData<ItemType>>(
    () => ({ dataSource, onItemClick: handleItemClick, measureRow }),
    [dataSource, handleItemClick, measureRow],
  );

  return (
    <S.ScrollableMenuWrapper>
      {dataSource.length ? (
        <Scrollbar
          absolute
          maxHeight={
            !virtualised && hasAutoItem
              ? undefined
              : listMaxHeight + SCROLLBAR_OFFSET
          }
        >
          <S.DropdownMenuList>
            {virtualised ? (
              <VariableSizeList
                ref={listRef}
                height={listHeight}
                itemData={itemData}
                itemCount={dataSource.length}
                itemSize={getItemSize}
                itemKey={(index: number) => rowKeys[index]}
                estimatedItemSize={getEstimatedItemSize(0)}
                width="100%"
                style={{ paddingRight: '8px' }}
              >
                {DropdownRow}
              </VariableSizeList>
            ) : (
              <>
                {dataSource.map((item) => {
                  return item.type === itemTypes.DIVIDER ? (
                    <S.DropdownMenuListItem {...item} />
                  ) : (
                    <S.DropdownMenuListItem
                      {...item}
                      itemKey={item.key}
                      onClick={(clickedItem) => {
                        item.onClick?.(clickedItem);
                        handleItemClick();
                      }}
                    />
                  );
                })}
              </>
            )}
          </S.DropdownMenuList>
        </Scrollbar>
      ) : (
        <S.EmptyStates
          iconPosition="top"
          customIcon={<SearchNoResultsL />}
          label={texts.noSearchResults}
        />
      )}
    </S.ScrollableMenuWrapper>
  );
};
