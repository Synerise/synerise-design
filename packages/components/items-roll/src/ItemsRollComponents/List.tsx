import React, { useMemo } from 'react';

import Icon, { InformationNoSearchResultL } from '@synerise/ds-icon';
import { GroupItem, ListContextProvider } from '@synerise/ds-list-item';

import * as S from '../ItemsRoll.styles';
import { type ItemRollElement } from '../ItemsRoll.types';
import { type ListProps } from './List.types';
import ItemElement from './ListItem';

export const itemsInGroup = (
  group: string,
  items: ItemRollElement[],
): ItemRollElement[] => items.filter((item) => item.group === group);

const List = ({
  groups,
  onItemClick,
  onItemRemove,
  noResultsLabel,
  removeTooltipLabel,
  searchValue,
  visibleItems,
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
        <Icon component={<InformationNoSearchResultL />} size={48} />
      </S.NoResultIconWrapper>
      {noResultsLabel}
    </S.NoResults>
  ) : (
    <ListContextProvider>
      <S.ListWrapper>{finalItems}</S.ListWrapper>
    </ListContextProvider>
  );
};

export default List;
