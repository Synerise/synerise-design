import React from 'react';

import type { StepCardProps } from '@synerise/ds-step-card';

export type MockStepCardProps = StepCardProps & {
  'data-testid'?: string;
};

export const mockStepCard = () => {
  jest.mock('@synerise/ds-step-card', () => ({
    __esModule: true,
    default: jest.fn(
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
  }));
};

export const mockStepCardMinimal = () => {
  jest.mock('@synerise/ds-step-card', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
