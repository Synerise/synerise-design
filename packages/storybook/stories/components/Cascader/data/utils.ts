import type { Category } from '@synerise/ds-cascader';
import { type ListItemProps } from '@synerise/ds-list-item';

export const removeDuplicates = (data: ListItemProps[]): ListItemProps[] => {
  const withoutDuplicates = data.reduce((arr: typeof data, item) => {
    const arrayAlreadyContainsItem = !!arr.find((x) => x.text === item.text);
    if (!arrayAlreadyContainsItem) {
      arr.push(item);
    }
    return arr;
  }, []);
  return withoutDuplicates;
};

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
