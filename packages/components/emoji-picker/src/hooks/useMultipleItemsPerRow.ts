import { useMemo } from 'react';

import type {
  EmojiCategory,
  EmojiVirtualListItem,
} from '../EmojiList/EmojiList.types';

export const useMultipleItemsPerRow = (
  data: EmojiCategory[],
  itemsPerRow: number,
): EmojiVirtualListItem[] => {
  const groupedData = useMemo(() => {
    return data.reduce((flatItemsAndCategories, group) => {
      const { title, emojis } = group;
      flatItemsAndCategories.push([
        {
          title,
        },
      ]);

      const groupItemsLength = emojis.length;
      const rowCount = Math.ceil(groupItemsLength / itemsPerRow);
      for (let i = 0; i < rowCount; i += 1) {
        const rowItems = [];
        for (let j = 0; j < itemsPerRow; j += 1) {
          const idx = itemsPerRow * i + j;
          if (idx < groupItemsLength) {
            rowItems.push(emojis[idx]);
          }
        }
        flatItemsAndCategories.push(rowItems);
      }
      return flatItemsAndCategories;
    }, [] as EmojiVirtualListItem[]);
  }, [data, itemsPerRow]);

  return groupedData;
};
