import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

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
