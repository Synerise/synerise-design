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

export const popoverMockFactory = () => ({
  default: vi.fn(
    ({ children, 'data-testid': dataTestId }: MockPopoverProps) => (
      <div data-testid={dataTestId || 'ds-popover'}>{children}</div>
    ),
  ),
  Popover: vi.fn(
    ({ children, 'data-testid': dataTestId }: MockPopoverProps) => (
      <div data-testid={dataTestId || 'ds-popover'}>{children}</div>
    ),
  ),
  PopoverTrigger: vi.fn(
    ({ children, 'data-testid': dataTestId }: MockPopoverChildProps) => (
      <div data-testid={dataTestId || 'ds-popover-trigger'}>{children}</div>
    ),
  ),
  PopoverContent: vi.fn(
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
  PopoverArrow: vi.fn(() => <div data-testid="ds-popover-arrow" />),
  PopoverClose: vi.fn(
    ({ children, 'data-testid': dataTestId }: MockPopoverChildProps) => (
      <button data-testid={dataTestId || 'ds-popover-close'}>{children}</button>
    ),
  ),
  FloatingDelayGroup: vi.fn(({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  )),
  limitShift: vi.fn(() => ({})),
  getPlacement: vi.fn((placement: string) => placement),
  HOVER_OPEN_DELAY: 100,
  HOVER_CLOSE_DELAY: 100,
  PLACEMENT_MAP: {},
});

export const popoverMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  Popover: vi.fn(() => null),
  PopoverTrigger: vi.fn(({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  )),
  PopoverContent: vi.fn(() => null),
  PopoverArrow: vi.fn(() => null),
  PopoverClose: vi.fn(() => null),
  FloatingDelayGroup: vi.fn(({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  )),
  limitShift: vi.fn(() => ({})),
  getPlacement: vi.fn((placement: string) => placement),
  HOVER_OPEN_DELAY: 100,
  HOVER_CLOSE_DELAY: 100,
  PLACEMENT_MAP: {},
});
