import React from 'react';

type MockPopoverProps = {
  children?: React.ReactNode;
  placement?: string;
  trigger?: string | string[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  testId?: string;
  'data-testid'?: string;
};

type MockPopoverChildProps = {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
  'data-testid'?: string;
};

export const mockPopover = () => {
  jest.mock('@synerise/ds-popover', () => ({
    __esModule: true,
    default: jest.fn(
      ({ children, 'data-testid': dataTestId }: MockPopoverProps) => (
        <div data-testid={dataTestId || 'ds-popover'}>{children}</div>
      ),
    ),
    Popover: jest.fn(
      ({ children, 'data-testid': dataTestId }: MockPopoverProps) => (
        <div data-testid={dataTestId || 'ds-popover'}>{children}</div>
      ),
    ),
    PopoverTrigger: jest.fn(
      ({ children, 'data-testid': dataTestId }: MockPopoverChildProps) => (
        <div data-testid={dataTestId || 'ds-popover-trigger'}>{children}</div>
      ),
    ),
    PopoverContent: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockPopoverChildProps) => (
        <div
          className={className}
          data-testid={dataTestId || 'ds-popover-content'}
        >
          {children}
        </div>
      ),
    ),
    PopoverArrow: jest.fn(() => <div data-testid="ds-popover-arrow" />),
    PopoverClose: jest.fn(
      ({ children, 'data-testid': dataTestId }: MockPopoverChildProps) => (
        <button data-testid={dataTestId || 'ds-popover-close'}>
          {children}
        </button>
      ),
    ),
    FloatingDelayGroup: jest.fn(
      ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    ),
    limitShift: jest.fn(() => ({})),
    getPlacement: jest.fn((placement: string) => placement),
    HOVER_OPEN_DELAY: 100,
    HOVER_CLOSE_DELAY: 100,
    PLACEMENT_MAP: {},
  }));
};

export const mockPopoverMinimal = () => {
  jest.mock('@synerise/ds-popover', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    Popover: jest.fn(() => null),
    PopoverTrigger: jest.fn(({ children }: { children?: React.ReactNode }) => (
      <>{children}</>
    )),
    PopoverContent: jest.fn(() => null),
    PopoverArrow: jest.fn(() => null),
    PopoverClose: jest.fn(() => null),
    FloatingDelayGroup: jest.fn(
      ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    ),
    limitShift: jest.fn(() => ({})),
    getPlacement: jest.fn((placement: string) => placement),
    HOVER_OPEN_DELAY: 100,
    HOVER_CLOSE_DELAY: 100,
    PLACEMENT_MAP: {},
  }));
};
