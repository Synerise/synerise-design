import React from 'react';

import type { StepCardProps } from '@synerise/ds-step-card';

export type MockStepCardProps = StepCardProps & {
  'data-testid'?: string;
};

export const stepCardMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      title,
      active,
      completed,
      disabled,
      'data-testid': dataTestId,
    }: MockStepCardProps) => (
      <div
        className={`ds-step-card ${className || ''}`}
        data-testid={dataTestId || 'ds-step-card'}
        data-title={title}
        data-active={active}
        data-completed={completed}
        data-disabled={disabled}
      >
        {children}
      </div>
    ),
  ),
});

export const stepCardMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
