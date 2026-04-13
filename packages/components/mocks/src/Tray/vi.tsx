import React from 'react';

type MockTrayProps = {
  children?: React.ReactNode;
  className?: string;
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  'data-testid'?: string;
};

type MockTrayProviderProps = {
  children?: React.ReactNode;
};

/**
 * Factory function for Tray mock.
 * Mocks the entire @synerise/ds-tray package including Tray, TrayProvider, and useTray hook.
 *
 * @example
 * ```typescript
 * import { trayMockFactory } from '@synerise/ds-mocks/Tray/vi';
 *
 * vi.mock('@synerise/ds-tray', trayMockFactory);
 * ```
 */
export const trayMockFactory = () => {
  const Tray = vi.fn(
    ({
      children,
      className,
      open,
      onClose,
      title,
      'data-testid': dataTestId,
    }: MockTrayProps) => {
      const testId = dataTestId || 'ds-tray';
      return (
        <div data-testid={testId} className={className} data-open={open}>
          {title && <div data-testid={`${testId}-title`}>{title}</div>}
          {onClose && (
            <button data-testid={`${testId}-close`} onClick={onClose}>
              Close
            </button>
          )}
          {children}
        </div>
      );
    },
  );

  const TrayProvider = vi.fn(({ children }: MockTrayProviderProps) => (
    <>{children}</>
  ));

  const useTray = vi.fn(() => ({
    open: false,
    setOpen: vi.fn(),
    toggle: vi.fn(),
  }));

  return {
    default: Tray,
    TrayProvider,
    useTray,
  };
};

/**
 * Factory function for minimal Tray mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-tray', trayMinimalMockFactory);
 * ```
 */
export const trayMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  TrayProvider: vi.fn(({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  )),
  useTray: vi.fn(() => ({
    open: false,
    setOpen: vi.fn(),
    toggle: vi.fn(),
  })),
});
