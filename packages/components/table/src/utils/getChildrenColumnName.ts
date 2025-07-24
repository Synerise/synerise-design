const DEFAULT_CHILDREN_COLUMN_NAME = 'children';

export const getChildrenColumnName = <T>(
  childrenColumnName?: keyof T,
): keyof T => {
  return childrenColumnName || (DEFAULT_CHILDREN_COLUMN_NAME as keyof T);
};
