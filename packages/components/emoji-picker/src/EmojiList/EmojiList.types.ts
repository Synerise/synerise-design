import type { ReactNode } from 'react';
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

export type EmojiListProps = {
  texts?: Partial<EmojiListTexts>;
  onSelect?: (emoji: Emoji) => void;
  searchQuery?: string;
};

export type EmojiCategory = {
  title: ReactNode;
  emojis: Emoji[];
};
