import React from 'react';

import type {
  AvatarProps,
  ObjectAvatarProps,
  UserAvatarProps,
} from '@synerise/ds-avatar';

export type MockAvatarProps = AvatarProps & {
  'data-testid'?: string;
};

export type MockUserAvatarProps = UserAvatarProps & {
  'data-testid'?: string;
};

export type MockObjectAvatarProps = ObjectAvatarProps & {
  'data-testid'?: string;
};

/**
 * Factory function for Avatar mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { avatarMockFactory } from '@synerise/ds-mocks/Avatar/vi';
 *
 * vi.mock('@synerise/ds-avatar', avatarMockFactory);
 * ```
 */
export const avatarMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      src,
      size,
      backgroundColor,
      disabled,
      tooltip,
      'data-testid': dataTestId,
    }: MockAvatarProps) => (
      <div
        data-testid={dataTestId || 'ds-avatar'}
        className={`ds-avatar ${className || ''}`}
        data-size={size}
        data-background-color={backgroundColor}
        data-disabled={disabled}
        data-has-tooltip={!!tooltip}
      >
        {src ? (
          <img
            src={src}
            alt="avatar"
            data-testid={`${dataTestId || 'ds-avatar'}-img`}
          />
        ) : (
          children
        )}
      </div>
    ),
  ),
  UserAvatar: vi.fn(
    ({
      user = {},
      size,
      badgeStatus,
      disabled,
      'data-testid': dataTestId,
    }: MockUserAvatarProps) => {
      const testId = dataTestId || 'ds-user-avatar';
      const initials = [user.firstName?.[0], user.lastName?.[0]]
        .filter(Boolean)
        .join('');
      return (
        <div
          data-testid={testId}
          className="ds-user-avatar"
          data-size={size}
          data-badge-status={badgeStatus}
          data-disabled={disabled}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="user avatar"
              data-testid={`${testId}-img`}
            />
          ) : (
            initials || user.email || 'User'
          )}
        </div>
      );
    },
  ),
  ObjectAvatar: vi.fn(
    ({
      object = {},
      size,
      disabled,
      'data-testid': dataTestId,
    }: MockObjectAvatarProps) => {
      const testId = dataTestId || 'ds-object-avatar';
      return (
        <div
          data-testid={testId}
          className="ds-object-avatar"
          data-size={size}
          data-disabled={disabled}
        >
          {object.avatar ? (
            <img
              src={object.avatar}
              alt="object avatar"
              data-testid={`${testId}-img`}
            />
          ) : (
            object.name || 'Object'
          )}
        </div>
      );
    },
  ),
  DefaultAvatarIcon: vi.fn(
    ({ index, ...rest }: { index: number; 'data-testid'?: string }) => (
      <div
        data-testid={rest['data-testid'] || 'ds-default-avatar-icon'}
        data-index={index}
      />
    ),
  ),
  TOTAL_DEFAULT_AVATARS: 100,
});

/**
 * Factory function for minimal Avatar mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-avatar', avatarMinimalMockFactory);
 * ```
 */
export const avatarMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  UserAvatar: vi.fn(() => null),
  ObjectAvatar: vi.fn(() => null),
  DefaultAvatarIcon: vi.fn(() => null),
  TOTAL_DEFAULT_AVATARS: 100,
});
