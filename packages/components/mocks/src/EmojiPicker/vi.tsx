import React from 'react';

import type { EmojiPickerProps } from '@synerise/ds-emoji-picker';

export type MockEmojiPickerProps = EmojiPickerProps & {
  'data-testid'?: string;
};

export const emojiPickerMockFactory = () => ({
  default: vi.fn(
    ({
      onSelect,
      className,
      'data-testid': dataTestId,
    }: MockEmojiPickerProps) => (
      <div
        className={`ds-emoji-picker ${className || ''}`}
        data-testid={dataTestId || 'ds-emoji-picker'}
        onClick={() => onSelect?.({} as never)}
      />
    ),
  ),
  EmojiPicker: vi.fn(
    ({
      onSelect,
      className,
      'data-testid': dataTestId,
    }: MockEmojiPickerProps) => (
      <div
        className={`ds-emoji-picker ${className || ''}`}
        data-testid={dataTestId || 'ds-emoji-picker'}
        onClick={() => onSelect?.({} as never)}
      />
    ),
  ),
});

export const emojiPickerMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  EmojiPicker: vi.fn(() => null),
});
