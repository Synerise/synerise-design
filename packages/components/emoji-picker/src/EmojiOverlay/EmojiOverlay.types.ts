import type { EmojiPickerProps } from '../EmojiPicker.types';

export type EmojiOverlayType = Pick<EmojiPickerProps, 'onSelect' | 'texts'> & {
  focus?: boolean;
};
