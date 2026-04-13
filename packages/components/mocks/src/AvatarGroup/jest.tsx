import React from 'react';

import type { AvatarGroupProps } from '@synerise/ds-avatar-group';

export type MockAvatarGroupProps = AvatarGroupProps & {
  'data-testid'?: string;
};

export const mockAvatarGroup = () => {
  jest.mock('@synerise/ds-avatar-group', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        size,
        'data-testid': dataTestId,
      }: MockAvatarGroupProps) => (
        <div
          className={`ds-avatar-group ${className || ''}`}
          data-testid={dataTestId || 'ds-avatar-group'}
          data-size={size}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockAvatarGroupMinimal = () => {
  jest.mock('@synerise/ds-avatar-group', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
