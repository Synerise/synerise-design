import { NO_GROUP_NAME } from '../constants';
import type { OperatorsItem } from '../Operator.types';

type GroupedOperators = Record<string, OperatorsItem[]>;

export const groupByGroupName = (activeItems: OperatorsItem[]) => {
  return activeItems.reduce((acc, item) => {
    const groupName = item.groupName || NO_GROUP_NAME;
    acc[groupName] = [...(acc[groupName] || []), item];
    return acc;
  }, {} as GroupedOperators);
};
