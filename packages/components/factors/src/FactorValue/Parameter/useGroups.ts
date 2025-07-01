import { useMemo } from 'react';

import { type ParameterGroup, type ParameterItem } from '../../Factors.types';

const itemIsParameterGroup = (
  item: ParameterGroup | undefined,
): item is ParameterGroup => {
  return Boolean(item);
};

export const useGroups = (
  items?: ParameterItem[],
  groups?: ParameterGroup[],
  renderEmptyGroups?: boolean,
) => {
  const defaultTab = useMemo(() => {
    const defaultIndex = groups?.findIndex(
      (group: ParameterGroup) => group.defaultGroup,
    );
    return defaultIndex || 0;
  }, [groups]);

  const visibleGroups = useMemo(() => {
    if (renderEmptyGroups) {
      return groups;
    }
    const groupIds = groups
      ?.map((group) => group.subGroups || group)
      .flat()
      .filter((group, index) => !(group.allowEmpty || index === 0))
      .map((group) => group.id);

    const groupsToSkip = groupIds?.filter(
      (groupId) => !items?.find((item) => item.groupId === groupId),
    );

    const cleanGroups = groups
      ?.map((group) => {
        if (group.subGroups && group.subGroups.length) {
          const filteredSubGroups = group.subGroups.filter(
            (subGroup) => !groupsToSkip?.includes(subGroup.id),
          );
          switch (filteredSubGroups.length) {
            case 0:
              return undefined;
            case 1:
              return {
                ...filteredSubGroups[0],
                icon: undefined,
              };
            default:
              return {
                ...group,
                subGroups: filteredSubGroups,
              };
          }
        }
        return groupsToSkip?.includes(group.id) ? undefined : group;
      })
      .filter(itemIsParameterGroup);
    return cleanGroups;
  }, [groups, items, renderEmptyGroups]);
  const tabs = useMemo(() => {
    return (
      visibleGroups?.map((group: ParameterGroup) => ({
        label: group.name,
        icon: group.icon,
      })) || []
    );
  }, [visibleGroups]);

  return {
    visibleGroups,
    tabs,
    defaultTab,
  };
};
