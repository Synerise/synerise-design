import React from 'react';

import type { SubjectProps } from '@synerise/ds-subject';

export type MockSubjectProps = SubjectProps & {
  'data-testid'?: string;
};

export const mockSubject = () => {
  jest.mock('@synerise/ds-subject', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        type,
        placeholder,
        iconPlaceholder,
        'data-testid': dataTestId,
      }: MockSubjectProps) => (
        <div
          className={`ds-subject ${className || ''}`}
          data-testid={dataTestId || 'ds-subject'}
          data-type={type}
          data-placeholder={placeholder}
          data-icon-placeholder={iconPlaceholder}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockSubjectMinimal = () => {
  jest.mock('@synerise/ds-subject', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
