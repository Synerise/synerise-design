import React from 'react';

import type { EditableItemsListProps } from '@synerise/ds-editable-items-list';

export type MockEditableItemsListProps = EditableItemsListProps & {
  'data-testid'?: string;
};

export const mockEditableItemsList = () => {
  jest.mock('@synerise/ds-editable-items-list', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockEditableItemsListProps) => (
        <div
          className={`ds-editable-items-list ${className || ''}`}
          data-testid={dataTestId || 'ds-editable-items-list'}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockEditableItemsListMinimal = () => {
  jest.mock('@synerise/ds-editable-items-list', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
