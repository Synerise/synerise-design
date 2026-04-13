import React from 'react';

type MockSkeletonProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

type MockCheckboxSkeletonProps = {
  className?: string;
  'data-testid'?: string;
};

type MockDropdownSkeletonProps = {
  className?: string;
  'data-testid'?: string;
};

type MockOrderedListSkeletonProps = {
  className?: string;
  'data-testid'?: string;
};

type MockSkeletonAvatarProps = {
  className?: string;
  'data-testid'?: string;
};

export const skeletonMockFactory = () => ({
  default: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockSkeletonProps) => (
      <div
        className={`ds-skeleton ${className || ''}`}
        data-testid={dataTestId || 'ds-skeleton'}
      >
        {children}
      </div>
    ),
  ),
  CheckboxSkeleton: vi.fn(
    ({ className, 'data-testid': dataTestId }: MockCheckboxSkeletonProps) => (
      <div
        className={`ds-checkbox-skeleton ${className || ''}`}
        data-testid={dataTestId || 'ds-checkbox-skeleton'}
      />
    ),
  ),
  DropdownSkeleton: vi.fn(
    ({ className, 'data-testid': dataTestId }: MockDropdownSkeletonProps) => (
      <div
        className={`ds-dropdown-skeleton ${className || ''}`}
        data-testid={dataTestId || 'ds-dropdown-skeleton'}
      />
    ),
  ),
  OrderedListSkeleton: vi.fn(
    ({
      className,
      'data-testid': dataTestId,
    }: MockOrderedListSkeletonProps) => (
      <div
        className={`ds-ordered-list-skeleton ${className || ''}`}
        data-testid={dataTestId || 'ds-ordered-list-skeleton'}
      />
    ),
  ),
  SkeletonAvatar: vi.fn(
    ({ className, 'data-testid': dataTestId }: MockSkeletonAvatarProps) => (
      <div
        className={`ds-skeleton-avatar ${className || ''}`}
        data-testid={dataTestId || 'ds-skeleton-avatar'}
      />
    ),
  ),
});

export const skeletonMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  CheckboxSkeleton: vi.fn(() => null),
  DropdownSkeleton: vi.fn(() => null),
  OrderedListSkeleton: vi.fn(() => null),
  SkeletonAvatar: vi.fn(() => null),
});
