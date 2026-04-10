const DEFAULT_CHILDREN_COLUMN_NAME = 'children';

export const getChildrenColumnName = <TData>(
  childrenColumnName?: keyof TData,
) => {
  return childrenColumnName || DEFAULT_CHILDREN_COLUMN_NAME;
};
