import React, { useMemo } from 'react';
import { FixedSizeList } from 'react-window';

import Icon, { SearchNoResultsM } from '@synerise/ds-icon';
import { GroupItem } from '@synerise/ds-list-item';

import * as S from '../ItemsRoll.styles';
import { type ItemRollElement } from '../ItemsRoll.types';
import { type ListProps } from './List.types';
import ItemElement from './ListItem';
import ItemRenderer from './VirtualizedListItem';

export const itemsInGroup = (
  group: string,
  items: ItemRollElement[],
): ItemRollElement[] => items.filter((item) => item.group === group);

const List = ({
  groups,
  items,
  onItemClick,
  onItemRemove,
  noResultsLabel,
  removeTooltipLabel,
  searchValue,
  useVirtualizedList,
  visibleItems,
  virtualizedRowHeight = 32,
  virtualizedRowWidth,
}: ListProps) => {
  const groupedList = useMemo(() => {
    return (
      <>
        {groups?.map((group) => {
          const groupItems = itemsInGroup(group, visibleItems);

          return groupItems.length > 0 ? (
            <GroupItem key={group} title={group}>
              {groupItems.map((item) => (
                <ItemElement
                  group={group}
                  key={item.id}
                  highlight={searchValue}
                  onItemClick={onItemClick}
                  onItemRemove={onItemRemove}
                  item={item}
                  removeTooltipLabel={removeTooltipLabel}
                />
              ))}
            </GroupItem>
          ) : null;
        })}
      </>
    );
  }, [
    groups,
    onItemClick,
    onItemRemove,
    removeTooltipLabel,
    searchValue,
    visibleItems,
  ]);

  const standardList = useMemo(() => {
    return (
      <>
        {visibleItems.map((item) => (
          <ItemElement
            key={item.id}
            highlight={searchValue}
            item={item}
            onItemClick={onItemClick}
            onItemRemove={onItemRemove}
            removeTooltipLabel={removeTooltipLabel}
          />
        ))}
      </>
    );
  }, [
    onItemClick,
    onItemRemove,
    removeTooltipLabel,
    searchValue,
    visibleItems,
  ]);

  const finalItems = groups ? groupedList : standardList;

  return visibleItems.length === 0 ? (
    <S.NoResults>
      <S.NoResultIconWrapper>
        <Icon component={<SearchNoResultsM />} size={25} />
      </S.NoResultIconWrapper>
      {noResultsLabel}
    </S.NoResults>
  ) : (
    <S.ListWrapper>
      {useVirtualizedList && !groups ? (
        <div data-testid="items-roll-virtualized-list">
          <FixedSizeList
            height={visibleItems.length * virtualizedRowHeight}
            itemData={items}
            itemCount={visibleItems.length}
            itemSize={virtualizedRowHeight}
            width={virtualizedRowWidth || '100%'}
          >
            {ItemRenderer({
              highlight: searchValue,
              onItemClick,
              onItemRemove,
              tooltipLabel: removeTooltipLabel,
            })}
          </FixedSizeList>
        </div>
      ) : (
        finalItems
      )}
    </S.ListWrapper>
  );
};

export default List;
