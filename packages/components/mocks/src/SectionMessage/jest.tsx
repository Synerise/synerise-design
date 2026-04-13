import React from 'react';

import type { SectionMessageProps } from '@synerise/ds-section-message';

export type MockSectionMessageProps = SectionMessageProps & {
  'data-testid'?: string;
};

export const mockSectionMessage = () => {
  jest.mock('@synerise/ds-section-message', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        type,
        message,
        'data-testid': dataTestId,
      }: MockSectionMessageProps) => (
        <div
          className={`ds-section-message ${className || ''}`}
          data-testid={dataTestId || 'ds-section-message'}
          data-type={type}
          data-message={message}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockSectionMessageMinimal = () => {
  jest.mock('@synerise/ds-section-message', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
