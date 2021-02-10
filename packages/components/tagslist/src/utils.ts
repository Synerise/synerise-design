import { TagsListItem } from './TagsList.types';

const DEFAULT_NAME = '';
const isDuplicate = (itemsList: TagsListItem[], item: TagsListItem): boolean => {
  return itemsList.some(i => i.name.toLowerCase() === item.name.toLowerCase() && i.id !== item.id);
};

export const addSuffixToDuplicate = (itemsList: TagsListItem[], editedItem: TagsListItem): TagsListItem => {
  let newItem = editedItem;
  while (isDuplicate(itemsList, newItem)) {
    newItem = { ...newItem, name: `${newItem.name || DEFAULT_NAME} (1)` };
  }
  return newItem;
};

export const sortAlphabetically = (prev: TagsListItem, next: TagsListItem): number => {
  const prevName = prev.name.toLowerCase();
  const nextName = next.name.toLowerCase();

  if (prevName < nextName) {
    return -1;
  }
  return prevName > nextName ? 1 : 0;
};

export const handleItemAdd = (items: TagsListItem[], addedItem: TagsListItem): TagsListItem[] => {
  const nonDuplicateItem = addSuffixToDuplicate(items, addedItem);
  return [...items, nonDuplicateItem];
};

export const handleItemFavourite = (items: TagsListItem[], item: TagsListItem): TagsListItem[] => {
  return items.map(i => {
    if (i.id === item.id) {
      return {
        ...i,
        favourite: !i.favourite,
      };
    }
    return i;
  });
};

export const handleItemEdit = (items: TagsListItem[], editedItem: TagsListItem): TagsListItem[] => {
  const nonDuplicateItem = addSuffixToDuplicate(items, editedItem);
  return items.map(i => {
    if (i.id === nonDuplicateItem.id) {
      return {
        ...i,
        name: nonDuplicateItem.name,
      };
    }
    return i;
  });
};

export const handleItemDelete = (items: TagsListItem[], deletedItem: TagsListItem): TagsListItem[] => {
  return items.filter(item => item.id !== deletedItem.id);
};

export const validateFolderName = (name: string): boolean => {
  const trimmedName = name.trim();
  // eslint-disable-next-line no-useless-escape
  const CONTAINS_ONLY_ALLOWED_CHARACTERS = /^[^\\\/\?\*\"\>\<\:\|]*$/im;
  if (!trimmedName || !trimmedName.match(CONTAINS_ONLY_ALLOWED_CHARACTERS)) {
    return false;
  }
  return true;
};
