import { type ReactText } from 'react';

import { type BaseGroupType } from './useSearchResults';

export const isItemInGroup = <GroupType extends BaseGroupType<GroupType>>(
  groupId?: ReactText,
  currentGroup?: GroupType,
): boolean => {
  if (!currentGroup || !groupId) {
    return true;
  }
  return currentGroup.subGroups
    ? currentGroup?.subGroups.findIndex(
        (group: GroupType) => group.id === groupId,
      ) > -1
    : groupId === currentGroup.id;
};

export const getActiveTabGroup = <GroupType extends BaseGroupType<GroupType>>(
  tabIndex: number,
  groups?: GroupType[],
): GroupType | undefined => {
  return groups && groups[tabIndex];
};

export const getGroupName = <GroupType extends BaseGroupType<GroupType>>(
  groupId: ReactText,
  groups: BaseGroupType<GroupType>[],
): string | undefined => {
  return groups
    .flatMap((group) => (group.subGroups ? group.subGroups : group))
    .find((group) => group.id === groupId)?.name;
};
