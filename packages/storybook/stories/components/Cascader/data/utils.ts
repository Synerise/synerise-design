import type { Category } from '@synerise/ds-cascader';

export const limitCategories = (
  rootCategory: Category,
  categoryLimit: number,
): Category => {
  return {
    ...rootCategory,
    children: rootCategory.children?.filter(
      (child) => (child.id as number) <= categoryLimit,
    ),
  };
};
