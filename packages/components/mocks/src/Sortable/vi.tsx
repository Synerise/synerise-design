import React, { type ReactNode } from 'react';

export type MockSortableProps = {
  children?: ReactNode;
  items?: unknown[];
  onDragEnd?: (...args: unknown[]) => void;
  className?: string;
  'data-testid'?: string;
};

export const sortableMockFactory = () => ({
  default: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockSortableProps) => (
      <div
        className={`ds-sortable ${className || ''}`}
        data-testid={dataTestId || 'ds-sortable'}
      >
        {children}
      </div>
    ),
  ),
  SortableContainer: vi.fn(({ children }: { children?: ReactNode }) => (
    <div data-testid="ds-sortable-container">{children}</div>
  )),
  useSortable: vi.fn(() => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    transition: null,
  })),
  arrayMove: vi.fn(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (arr: any[], _from: number, _to: number) => arr,
  ),
  CSS: {},
});

export const sortableMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  SortableContainer: vi.fn(() => null),
  useSortable: vi.fn(() => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    transition: null,
  })),
  arrayMove: vi.fn(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (arr: any[]) => arr,
  ),
  CSS: {},
});
