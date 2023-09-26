import * as React from 'react';
import { FixedSizeList } from 'react-window';

import Icon, { SearchNoResultsM } from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';

import ItemElement from './ListItem';
import ItemRenderer from './VirtualizedListItem';

import * as S from '../ItemsRoll.styles';
import { ItemRollElement } from '../ItemsRoll.types';
import { ListProps } from './List.types';

export const itemsInGroup = (group: string, items: ItemRollElement[]): ItemRollElement[] =>
  items.filter(item => item.group === group);

const List: React.FC<ListProps> = ({
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
}) => {
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
        <Menu data-testid="items-roll-virtualized-list">
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
        </Menu>
      ) : (
        <Menu>
          {groups
            ? groups.map(group => {
                const groupItems = itemsInGroup(group, visibleItems);

                return groupItems.length > 0 ? (
                  // @ts-ignore
                  <Menu.ItemGroup key={group} title={group}>
                    {groupItems.map(item => (
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
                  </Menu.ItemGroup>
                ) : null;
              })
            : visibleItems.map(item => (
                <ItemElement
                  key={item.id}
                  highlight={searchValue}
                  item={item}
                  onItemClick={onItemClick}
                  onItemRemove={onItemRemove}
                  removeTooltipLabel={removeTooltipLabel}
                />
              ))}
        </Menu>
      )}
    </S.ListWrapper>
  );
};

export default List;
