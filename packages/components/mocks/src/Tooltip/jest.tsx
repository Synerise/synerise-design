import React from 'react';

import type { TooltipProps } from '@synerise/ds-tooltip';

export type MockTooltipProps = TooltipProps & {
  'data-testid'?: string;
};

export const mockTooltip = (options: { showContent?: boolean } = {}) => {
  jest.mock('@synerise/ds-tooltip', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        title,
        description,
        type,
        'data-testid': dataTestId,
      }: MockTooltipProps) => {
        const testId = dataTestId || 'ds-tooltip';

        return (
          <span data-testid={testId} data-tooltip-type={type}>
            {children}
            {options.showContent && (title || description) && (
              <div data-testid={`${testId}-content`}>
                {title && <div data-testid={`${testId}-title`}>{title}</div>}
                {description && (
                  <div data-testid={`${testId}-description`}>{description}</div>
                )}
              </div>
            )}
          </span>
        );
      },
    ),
  }));
};

export const mockTooltipMinimal = () => {
  jest.mock('@synerise/ds-tooltip', () => ({
    __esModule: true,
    default: jest.fn(({ children }: MockTooltipProps) => <>{children}</>),
  }));
};
