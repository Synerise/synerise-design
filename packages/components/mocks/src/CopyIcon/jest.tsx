import React from 'react';

import type { CopyIconProps } from '@synerise/ds-copy-icon';

export type MockCopyIconProps = CopyIconProps & {
  'data-testid'?: string;
};

export const mockCopyIcon = () => {
  jest.mock('@synerise/ds-copy-icon', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        text,
        onCopy,
        className,
        'data-testid': dataTestId,
      }: MockCopyIconProps) => (
        <button
          className={`ds-copy-icon ${className || ''}`}
          data-testid={dataTestId || 'ds-copy-icon'}
          data-text={text}
          onClick={() => onCopy?.()}
        />
      ),
    ),
  }));
};

export const mockCopyIconMinimal = () => {
  jest.mock('@synerise/ds-copy-icon', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
