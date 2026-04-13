import React from 'react';

import type { TagProps } from '@synerise/ds-tag';

export type MockTagProps = TagProps & {
  'data-testid'?: string;
};

export const mockTag = () => {
  jest.mock('@synerise/ds-tag', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        name,
        color,
        shape,
        removable,
        disabled,
        onRemove,
        onClick,
        children,
        className,
        'data-testid': dataTestId,
      }: MockTagProps) => (
        <span
          className={`ds-tag ${className || ''}`}
          data-testid={dataTestId || 'ds-tag'}
          data-color={color}
          data-shape={shape}
          data-removable={removable}
          data-disabled={disabled}
          onClick={onClick}
        >
          {name || children}
          {removable && !disabled && (
            <button
              data-testid={`${dataTestId || 'ds-tag'}-remove`}
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.();
              }}
            >
              Remove
            </button>
          )}
        </span>
      ),
    ),
    TagShape: {
      STATUS_SHAPE: 'status-shape',
      SINGLE_CHARACTER_ROUND: 'single-character-round',
      SINGLE_CHARACTER_SQUARE: 'single-character-square',
      SMALL: 'small',
      DEFAULT_ROUND: 'default-round',
      DEFAULT_SQUARE: 'default-square',
    },
    useDefaultTexts: jest.fn(() => ({})),
  }));
};

export const mockTagMinimal = () => {
  jest.mock('@synerise/ds-tag', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    TagShape: {
      STATUS_SHAPE: 'status-shape',
      SINGLE_CHARACTER_ROUND: 'single-character-round',
      SINGLE_CHARACTER_SQUARE: 'single-character-square',
      SMALL: 'small',
      DEFAULT_ROUND: 'default-round',
      DEFAULT_SQUARE: 'default-square',
    },
    useDefaultTexts: jest.fn(() => ({})),
  }));
};
