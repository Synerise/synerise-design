import React from 'react';

import type { TooltipProps } from '@synerise/ds-tooltip';

export type MockTooltipProps = TooltipProps & {
  'data-testid'?: string;
};

/**
 * Factory function for Tooltip mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { tooltipMockFactory } from '@synerise/ds-mocks/Tooltip/vi';
 *
 * vi.mock('@synerise/ds-tooltip', tooltipMockFactory());
 * ```
 */
export const tooltipMockFactory =
  (options: { showContent?: boolean } = {}) =>
  () => ({
    default: vi.fn(
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
  });

/**
 * Factory function for minimal Tooltip mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-tooltip', tooltipMinimalMockFactory);
 * ```
 */
export const tooltipMinimalMockFactory = () => ({
  default: vi.fn(({ children }: MockTooltipProps) => <>{children}</>),
});
