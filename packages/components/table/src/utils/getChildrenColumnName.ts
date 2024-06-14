const DEFAULT_CHILDREN_COLUMN_NAME = 'children';

export const getChildrenColumnName = (childrenColumnName?: string) => {
  return childrenColumnName || DEFAULT_CHILDREN_COLUMN_NAME;
};
