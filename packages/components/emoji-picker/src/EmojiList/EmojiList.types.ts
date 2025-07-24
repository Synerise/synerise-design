import type { CSSProperties, ReactNode } from 'react';
import type { Emoji } from 'unicode-emoji-utils';

export type EmojiListTexts = {
  'smileys-emotion': ReactNode;
  'people-body': ReactNode;
  'animals-nature': ReactNode;
  'food-drink': ReactNode;
  'travel-places': ReactNode;
  activities: ReactNode;
  objects: ReactNode;
  symbols: ReactNode;
  flags: ReactNode;
};

export type EmojiCategories = keyof EmojiListTexts;

export type EmojiListProps = {
  texts?: Partial<EmojiListTexts>;
  onSelect?: (emoji: Emoji) => void;
  searchQuery?: string;
};

export type EmojiCategory = {
  title: ReactNode;
  emojis: Emoji[];
};

export type RowItemProps = {
  data: ListItemData;
  index: number;
  style: CSSProperties;
};

export type TitleItem = { title: ReactNode };
export type EmojiVirtualListItem = Emoji[] | TitleItem[];

export type ListItemData = {
  items: EmojiVirtualListItem[];
  onSelect?: (emoji: Emoji) => void;
  itemsPerRow: number;
  elementSize: number;
};

export type ListItemProps = {
  element: Emoji;
  index: number;
  itemsPerRow: number;
  onSelect: (emoji: Emoji) => void;
};
