import type { GroupType } from '../GroupTable/GroupTable.types';

export const isGrouped = <T extends object>(
  dataSource?: readonly T[] | GroupType<T>[]
): dataSource is GroupType<T>[] => {
  return !!(dataSource?.length && 'rows' in dataSource[0]);
};
