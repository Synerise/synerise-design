import React, { useCallback, useMemo } from 'react';
import { VariableSizeList } from 'react-window';

import { SearchNoResultsL } from '@synerise/ds-icon';
import {
  LIST_ITEM_SIZE_MAPPING,
  type ListItemProps,
} from '@synerise/ds-list-item';
import Scrollbar from '@synerise/ds-scrollbar';

import { MAX_VISIBLE_ITEMS, SCROLLBAR_OFFSET } from '../../Dropdown.const';
import * as S from './DropdownMenuList.styles';
import { type DropdownMenuListProps } from './DropdownMenuList.types';

export const DropdownMenuList = <ItemType extends ListItemProps>({
  dataSource,
  maxVisibleItems = MAX_VISIBLE_ITEMS,
  hideOnItemClick,
  virtualised,
  closeOverlay,
  texts,
}: DropdownMenuListProps<ItemType>) => {
  const getItemSize = useCallback(
    (index: number) => {
      return dataSource[index].type === 'divider'
        ? 17
        : LIST_ITEM_SIZE_MAPPING[dataSource[index].size || 'default'];
    },
    [dataSource],
  );
  const handleItemClick = useCallback(() => {
    if (hideOnItemClick) {
      setTimeout(() => {
        closeOverlay();
      }, 10);
    }
  }, [hideOnItemClick, closeOverlay]);

  const { listHeight, listMaxHeight } = useMemo(() => {
    let height = 0;
    let maxHeight = 0;
    let visibleItems = 0;
    dataSource.forEach((item, index) => {
      const itemHeight = getItemSize(index);
      height += itemHeight;
      if (visibleItems < maxVisibleItems) {
        maxHeight += itemHeight;
      }
      if (item.type !== 'divider') {
        visibleItems += 1;
      }
    });
    return {
      listHeight: height,
      listMaxHeight: maxHeight,
    };
  }, [dataSource, getItemSize, maxVisibleItems]);

  return (
    <S.ScrollableMenuWrapper>
      {dataSource.length ? (
        <Scrollbar absolute maxHeight={listMaxHeight + SCROLLBAR_OFFSET}>
          <S.DropdownMenuList>
            {virtualised ? (
              <VariableSizeList
                height={listHeight}
                itemData={dataSource}
                itemCount={dataSource.length}
                itemSize={getItemSize}
                width="100%"
                style={{ paddingRight: '8px' }}
              >
                {(listItemData) => {
                  const { data, index } = listItemData;
                  const item = data[index];
                  return item.type === 'divider' ? (
                    <S.DropdownMenuListItem {...item} />
                  ) : (
                    <S.DropdownMenuListItem
                      {...item}
                      itemKey={item.key}
                      onClick={(itemData) => {
                        item.onClick?.(itemData);
                        handleItemClick();
                      }}
                    />
                  );
                }}
              </VariableSizeList>
            ) : (
              <>
                {dataSource.map((item) => {
                  return item.type === 'divider' ? (
                    <S.DropdownMenuListItem {...item} />
                  ) : (
                    <S.DropdownMenuListItem
                      {...item}
                      itemKey={item.key}
                      onClick={(itemData) => {
                        item.onClick?.(itemData);
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
