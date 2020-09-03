import { FolderItem } from './Folders.types';

const DEFAULT_NAME = 'Folder';
const isDuplicate = (itemsList: FolderItem[], item: FolderItem): boolean => {
  return itemsList.some(i => i.name.toLowerCase() === item.name.toLowerCase() && i.id !== item.id);
};
export const addSuffixToDuplicate = (itemsList: FolderItem[], editedItem: FolderItem): FolderItem => {
  let newItem = editedItem;
  while (isDuplicate(itemsList, newItem)) {
    newItem = { ...newItem, name: `${newItem.name || DEFAULT_NAME} (1)` };
  }
  return newItem;
};

export const sortAlphabetically = (prev: FolderItem, next: FolderItem): number => {
  const prevName = prev.name.toLowerCase();
  const nextName = next.name.toLowerCase();

  if (prevName < nextName) {
    return -1;
  }
  return prevName > nextName ? 1 : 0;
};

export const handleItemAdd = (items: FolderItem[], addedItem: FolderItem) => {
  const nonDuplicateItem = addSuffixToDuplicate(items, addedItem);
  return [...items, nonDuplicateItem];
};

export const handleItemFavourite = (items: FolderItem[], item: FolderItem) => {
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
export const handleItemEdit = (items: FolderItem[], editedItem: FolderItem) => {
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

export const handleItemDelete = (items: FolderItem[], deletedItem: FolderItem) => {
  return items.filter(item => item.id !== deletedItem.id);
};
