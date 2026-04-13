import React from 'react';

import type { FieldSetProps } from '@synerise/ds-field-set';

export type MockFieldSetProps = FieldSetProps & {
  'data-testid'?: string;
};

export const mockFieldSet = () => {
  jest.mock('@synerise/ds-field-set', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        title,
        description,
        'data-testid': dataTestId,
      }: MockFieldSetProps) => (
        <div
          className={`ds-field-set ${className || ''}`}
          data-testid={dataTestId || 'ds-field-set'}
          data-title={title}
          data-description={description}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockFieldSetMinimal = () => {
  jest.mock('@synerise/ds-field-set', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
