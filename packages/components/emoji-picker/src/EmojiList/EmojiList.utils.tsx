import memoize from 'memoize-one';

import type { ListItemData } from './EmojiList.types';

export const createItemData = memoize(
  (
    items: ListItemData['items'],
    elementSize: ListItemData['elementSize'],
    onSelect: ListItemData['onSelect'],
    itemsPerRow: ListItemData['itemsPerRow'],
  ): ListItemData => ({
    items,
    elementSize,
    onSelect,
    itemsPerRow,
  }),
);
