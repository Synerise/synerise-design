import React from 'react';

type MockNavbarProps = {
  children?: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  'data-testid'?: string;
};

type MockNavbarDividerProps = {
  'data-testid'?: string;
};

/**
 * Factory function for Navbar mock.
 * Mocks the entire @synerise/ds-navbar package including Navbar and Navbar.Divider.
 *
 * @example
 * ```typescript
 * import { navbarMockFactory } from '@synerise/ds-mocks/Navbar/vi';
 *
 * vi.mock('@synerise/ds-navbar', navbarMockFactory);
 * ```
 */
export const navbarMockFactory = () => {
  const Divider = vi.fn(
    ({ 'data-testid': dataTestId }: MockNavbarDividerProps) => (
      <hr data-testid={dataTestId || 'ds-navbar-divider'} />
    ),
  );

  const Navbar = Object.assign(
    vi.fn(
      ({
        children,
        className,
        description,
        'data-testid': dataTestId,
      }: MockNavbarProps) => {
        const testId = dataTestId || 'ds-navbar';
        return (
          <div data-testid={testId} className={className}>
            {description && (
              <div data-testid={`${testId}-description`}>{description}</div>
            )}
            {children}
          </div>
        );
      },
    ),
    { Divider },
  );

  return { default: Navbar };
};

/**
 * Factory function for minimal Navbar mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-navbar', navbarMinimalMockFactory);
 * ```
 */
export const navbarMinimalMockFactory = () => {
  const Navbar = Object.assign(
    vi.fn(() => null),
    { Divider: vi.fn(() => null) },
  );

  return { default: Navbar };
};
