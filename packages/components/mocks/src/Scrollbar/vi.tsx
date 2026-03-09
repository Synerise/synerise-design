import React from 'react';

/**
 * Factory function for Scrollbar mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { scrollbarMockFactory } from '@synerise/ds-mocks/Scrollbar/vi';
 *
 * vi.mock('@synerise/ds-scrollbar', scrollbarMockFactory);
 * ```
 */
export const scrollbarMockFactory = () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', null, children),
});
