import { useMemo } from 'react';

import { getActiveTabGroup, getGroupName, isItemInGroup } from './search.utils';
import { type BaseGroupType, type BaseItemType } from './types';

export const useSearchResults = <
  ItemType extends BaseItemType,
  GroupType extends BaseGroupType<GroupType>,
  GroupedListItemType,
>(
  items: ItemType[],
  groups: GroupType[],
  activeTab: number,
  groupByGroupName: (items: ItemType[], max?: number) => GroupedListItemType[],
  activeGroup?: GroupType,
  searchQuery?: string,
  maxSearchResultsInGroup?: number,
) => {
  const showGroupedResults = useMemo(
    () =>
      activeTab && !activeGroup
        ? Boolean(getActiveTabGroup(activeTab, groups)?.subGroups)
        : Boolean(activeTab === 0 && !activeGroup),
    [activeTab, activeGroup, groups],
  );

  const groupOrder = useMemo(
    () =>
      groups.flatMap((group) =>
        group.subGroups
          ? group.subGroups.map((subgroup) => subgroup.id)
          : group.id,
      ),
    [groups],
  );

  const searchResults = useMemo(() => {
    if (!searchQuery) {
      return [];
    }
    const result = [];
    const itemsNumber = items.length;
    for (let i = 0; i < itemsNumber; i += 1) {
      const item = items[i];

      const itemInTab =
        !activeTab ||
        isItemInGroup(item.groupId, getActiveTabGroup(activeTab, groups));
      const itemInGroup = !activeGroup || item.groupId === activeGroup.id;

      if (itemInGroup && itemInTab) {
        const searchQueryInLowerCase = searchQuery.toLowerCase();
        const isMatchingName = item.name
          ?.toLowerCase()
          .includes(searchQueryInLowerCase);
        const isMatchingSubtitle = item.subtitle
          ?.toLowerCase()
          .includes(searchQueryInLowerCase);
        const matching = !searchQuery || isMatchingName || isMatchingSubtitle;

        if (matching) {
          result.push({
            groupName:
              showGroupedResults && item.groupId
                ? getGroupName(item.groupId, groups)
                : undefined,
            ...item,
          });
        }
      }
    }
    if (groupOrder && groupOrder.length) {
      result.sort((a, b) =>
        a.groupId !== undefined && b.groupId !== undefined
          ? groupOrder.indexOf(a.groupId) - groupOrder.indexOf(b.groupId)
          : 0,
      );
    }
    return result;
  }, [
    activeGroup,
    activeTab,
    groupOrder,
    groups,
    items,
    searchQuery,
    showGroupedResults,
  ]);

  const groupedSearchResults = useMemo(() => {
    return groupByGroupName(
      searchResults,
      showGroupedResults ? maxSearchResultsInGroup : undefined,
    );
  }, [
    groupByGroupName,
    searchResults,
    showGroupedResults,
    maxSearchResultsInGroup,
  ]);

  return {
    searchResults: groupedSearchResults,
    getActiveTabGroup,
    getGroupName,
  };
};
