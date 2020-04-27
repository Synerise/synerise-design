import * as React from 'react';
import { FixedSizeList } from 'react-window';
import Icon from '@synerise/ds-icon';
import SearchNoResultsM from '@synerise/ds-icon/dist/icons/SearchNoResultsM';
import Menu from '@synerise/ds-menu';

import * as S from '../ItemsRoll.styles';
import { ItemElement, ItemRenderer } from './ListItem';
import { ItemsRollProps, ItemRollElement } from '../ItemsRoll.types';

type ListProps = Pick<
  ItemsRollProps,
  'groups' | 'items' | 'searchValue' | 'useVirtualizedList' | 'virtualizedRowHeight' | 'virtualizedRowWidth'
> & {
  noResultsLabel: string | React.ReactNode;
  removeTooltipLabel: string | React.ReactNode;
  visibleItems: ItemRollElement[];
};

export const itemsInGroup = (group: string, items: ItemRollElement[]): ItemRollElement[] =>
  items.filter(item => item.group === group);

const List: React.FC<ListProps> = ({
  groups,
  items,
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
            {ItemRenderer({ highlight: searchValue, tooltipLabel: removeTooltipLabel })}
          </FixedSizeList>
        </Menu>
      ) : (
        <Menu>
          {groups
            ? groups.map(group => {
                const groupItems = itemsInGroup(group, visibleItems);

                return groupItems.length > 0 ? (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                  // @ts-ignore
                  <Menu.ItemGroup key={group} title={group}>
                    {groupItems.map(item => (
                      <ItemElement
                        key={item.id}
                        highlight={searchValue}
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
                  removeTooltipLabel={removeTooltipLabel}
                />
              ))}
        </Menu>
      )}
    </S.ListWrapper>
  );
};

export default List;
