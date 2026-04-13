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

export const mockTray = () => {
  jest.mock('@synerise/ds-tray', () => {
    const Tray = jest.fn(
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

    const TrayProvider = jest.fn(({ children }: MockTrayProviderProps) => (
      <>{children}</>
    ));

    const useTray = jest.fn(() => ({
      open: false,
      setOpen: jest.fn(),
      toggle: jest.fn(),
    }));

    return {
      __esModule: true,
      default: Tray,
      TrayProvider,
      useTray,
    };
  });
};

export const mockTrayMinimal = () => {
  jest.mock('@synerise/ds-tray', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    TrayProvider: jest.fn(({ children }: { children?: React.ReactNode }) => (
      <>{children}</>
    )),
    useTray: jest.fn(() => ({
      open: false,
      setOpen: jest.fn(),
      toggle: jest.fn(),
    })),
  }));
};
