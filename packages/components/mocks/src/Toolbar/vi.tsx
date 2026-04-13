import React from 'react';

type MockToolbarProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

type MockToolbarGroupProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockToolbarButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  'data-testid'?: string;
};

type MockToolbarLabelProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockToolbarDividerProps = {
  'data-testid'?: string;
};

/**
 * Factory function for Toolbar mock.
 * Mocks the entire @synerise/ds-toolbar package including Toolbar, ToolbarGroup, ToolbarButton, ToolbarLabel, and ToolbarDivider.
 *
 * @example
 * ```typescript
 * import { toolbarMockFactory } from '@synerise/ds-mocks/Toolbar/vi';
 *
 * vi.mock('@synerise/ds-toolbar', toolbarMockFactory);
 * ```
 */
export const toolbarMockFactory = () => ({
  default: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockToolbarProps) => {
      const testId = dataTestId || 'ds-toolbar';
      return (
        <div data-testid={testId} className={`ds-toolbar ${className || ''}`}>
          {children}
        </div>
      );
    },
  ),
  ToolbarGroup: vi.fn(
    ({ children, 'data-testid': dataTestId }: MockToolbarGroupProps) => (
      <div data-testid={dataTestId || 'ds-toolbar-group'}>{children}</div>
    ),
  ),
  ToolbarButton: vi.fn(
    ({
      children,
      onClick,
      disabled,
      'data-testid': dataTestId,
    }: MockToolbarButtonProps) => (
      <button
        data-testid={dataTestId || 'ds-toolbar-button'}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {children}
      </button>
    ),
  ),
  ToolbarLabel: vi.fn(
    ({ children, 'data-testid': dataTestId }: MockToolbarLabelProps) => (
      <span data-testid={dataTestId || 'ds-toolbar-label'}>{children}</span>
    ),
  ),
  ToolbarDivider: vi.fn(
    ({ 'data-testid': dataTestId }: MockToolbarDividerProps) => (
      <hr data-testid={dataTestId || 'ds-toolbar-divider'} />
    ),
  ),
});

/**
 * Factory function for minimal Toolbar mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-toolbar', toolbarMinimalMockFactory);
 * ```
 */
export const toolbarMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  ToolbarGroup: vi.fn(() => null),
  ToolbarButton: vi.fn(() => null),
  ToolbarLabel: vi.fn(() => null),
  ToolbarDivider: vi.fn(() => null),
});
