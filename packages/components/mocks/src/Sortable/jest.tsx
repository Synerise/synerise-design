import React, { type ReactNode } from 'react';

export type MockSortableProps = {
  children?: ReactNode;
  items?: unknown[];
  onDragEnd?: (...args: unknown[]) => void;
  className?: string;
  'data-testid'?: string;
};

export const mockSortable = () => {
  jest.mock('@synerise/ds-sortable', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockSortableProps) => (
        <div
          className={`ds-sortable ${className || ''}`}
          data-testid={dataTestId || 'ds-sortable'}
        >
          {children}
        </div>
      ),
    ),
    SortableContainer: jest.fn(({ children }: { children?: ReactNode }) => (
      <div data-testid="ds-sortable-container">{children}</div>
    )),
    useSortable: jest.fn(() => ({
      attributes: {},
      listeners: {},
      setNodeRef: jest.fn(),
      transform: null,
      transition: null,
    })),
    arrayMove: jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (arr: any[], _from: number, _to: number) => arr,
    ),
    CSS: {},
  }));
};

export const mockSortableMinimal = () => {
  jest.mock('@synerise/ds-sortable', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    SortableContainer: jest.fn(() => null),
    useSortable: jest.fn(() => ({
      attributes: {},
      listeners: {},
      setNodeRef: jest.fn(),
      transform: null,
      transition: null,
    })),
    arrayMove: jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (arr: any[]) => arr,
    ),
    CSS: {},
  }));
};
