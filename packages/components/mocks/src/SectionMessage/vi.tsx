import React from 'react';

import type { SectionMessageProps } from '@synerise/ds-section-message';

export type MockSectionMessageProps = SectionMessageProps & {
  'data-testid'?: string;
};

export const sectionMessageMockFactory = () => ({
  default: vi.fn(
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
});

export const sectionMessageMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
