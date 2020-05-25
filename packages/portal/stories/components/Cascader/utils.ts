import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { Category } from '@synerise/ds-cascader/dist/Cascader.types';

export const removeDuplicates = (data: MenuItemProps[]): MenuItemProps[] => {
  const withoutDuplicates = data.reduce((arr: typeof data, item) => {
    const arrayAlreadyContainsItem = !!arr.find(x => x.text === item.text);
    if (!arrayAlreadyContainsItem) {
      arr.push(item);
    }
    return arr;
  }, []);
  return withoutDuplicates;
};

export const limitCategories = (rootCategory: Category, categoryLimit: number) => {
  let filteredCategories = {};
  const keys = Object.keys(rootCategory);
  let property;
  for (let i = 0; i < keys.length; i += 1) {
    property = keys[i];
    if (
      Object.prototype.hasOwnProperty.call(rootCategory, property) &&
      typeof rootCategory[property] === 'object' &&
      Object.prototype.toString.call(rootCategory[property]) === '[object Object]'
    ) {
      if (rootCategory[property].id && rootCategory[property].id <= categoryLimit)
        filteredCategories = { ...filteredCategories, [property]: rootCategory[property] };
    }
  }
  return filteredCategories;
};
