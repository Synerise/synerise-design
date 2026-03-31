import type { Category } from '@synerise/ds-cascader';
import { MenuItemProps } from '@synerise/ds-menu';

export const removeDuplicates = (data: MenuItemProps[]): MenuItemProps[] => {
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
