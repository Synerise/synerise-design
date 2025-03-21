import type { ReactElement } from 'react';
import type { DropdownProps } from '@synerise/ds-dropdown';
import type { Emoji } from 'unicode-emoji-utils';
import type { EmojiListTexts } from './EmojiList/EmojiList.types';

export type EmojiPickerTexts = EmojiListTexts & {
  placeholder: string;
};

export type EmojiPickerProps = {
  children?: ReactElement;
  onSelect?: (emoji: Emoji) => void;
  dropdownProps?: Partial<DropdownProps>;
  texts?: Partial<EmojiPickerTexts>;
  closeOnSelect?: boolean;
};
