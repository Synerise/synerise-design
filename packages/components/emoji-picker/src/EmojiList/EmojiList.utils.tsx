import memoize from 'memoize-one';
import {
  type Emoji,
  getEmojisByGroup as getEmojisByGroupBase,
} from 'unicode-emoji-utils';

import type { EmojiCategories, ListItemData } from './EmojiList.types';

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

export const getEmojisByGroup = getEmojisByGroupBase as (
  ...props: Parameters<typeof getEmojisByGroupBase>
) => Map<EmojiCategories, Emoji[]>;
