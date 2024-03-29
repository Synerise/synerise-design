import { OperatorsGroup, OperatorsItem } from '../Operator.types';
import { ITEM_HEIGHT } from '../constants';

export const calculateGroupHeight = (group: OperatorsGroup, allItems: OperatorsItem[]) => {
  if (group.subGroups) {
    return group.subGroups?.length * ITEM_HEIGHT;
  }
  const groupItems = allItems.filter((item: OperatorsItem) => item.groupId === group.id);
  const groupNames = new Set(groupItems.map(item => item.groupName).filter(Boolean));
  return (groupItems.length + groupNames.size) * ITEM_HEIGHT;
};
