import React from 'react';

import type { IconProps } from '@synerise/ds-icon';

export type MockIconProps = IconProps & {
  'data-testid'?: string;
  /** Icon name as string */
  iconName?: string;
};

/**
 * Factory function for Icon mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { iconMockFactory } from '@synerise/ds-mocks/Icon/vi';
 *
 * vi.mock('@synerise/ds-icon', iconMockFactory);
 * ```
 */
export const iconMockFactory = () => ({
  default: vi.fn(
    ({
      name,
      iconName,
      component,
      className,
      size,
      color,
      stroke,
      'data-testid': dataTestId,
    }: MockIconProps) => {
      const resolvedIconName = iconName || name;
      return (
        <div
          className={`ds-icon ${className || ''}`}
          data-testid={dataTestId || 'ds-icon'}
          data-icon={resolvedIconName}
          data-icon-size={size}
          data-icon-color={color}
          data-icon-stroke={stroke}
          title={resolvedIconName}
        >
          {component || resolvedIconName || 'Icon'}
        </div>
      );
    },
  ),
});

/**
 * Factory function for Icon mock with custom render function.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-icon', iconWithRenderMockFactory((props) => (
 *   <span data-custom-icon={props.iconName}>{props.iconName}</span>
 * )));
 * ```
 */
export const iconWithRenderMockFactory =
  (renderFn: (props: IconProps) => JSX.Element) => () => ({
    default: vi.fn(renderFn),
  });

/**
 * Factory function for minimal Icon mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-icon', iconMinimalMockFactory);
 * ```
 */
export const iconMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
