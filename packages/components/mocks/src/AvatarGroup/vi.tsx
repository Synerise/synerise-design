import React from 'react';

import type { AvatarGroupProps } from '@synerise/ds-avatar-group';

export type MockAvatarGroupProps = AvatarGroupProps & {
  'data-testid'?: string;
};

export const avatarGroupMockFactory = () => ({
  default: vi.fn(
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
});

export const avatarGroupMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
