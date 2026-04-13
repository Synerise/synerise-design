import React from 'react';

import type { EmojiPickerProps } from '@synerise/ds-emoji-picker';

export type MockEmojiPickerProps = EmojiPickerProps & {
  'data-testid'?: string;
};

export const mockEmojiPicker = () => {
  jest.mock('@synerise/ds-emoji-picker', () => ({
    __esModule: true,
    default: jest.fn(
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
    EmojiPicker: jest.fn(
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
  }));
};

export const mockEmojiPickerMinimal = () => {
  jest.mock('@synerise/ds-emoji-picker', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    EmojiPicker: jest.fn(() => null),
  }));
};
