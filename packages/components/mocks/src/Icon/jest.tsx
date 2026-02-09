import React from 'react';

import type { IconProps } from '@synerise/ds-icon';

export type MockIconProps = IconProps & {
  'data-testid'?: string;
  /** Icon name as string */
  iconName?: string;
};

/**
 * Mocks the main Icon component from @synerise/ds-icon.
 * The mock renders the `iconName` prop as text content.
 *
 * @example
 * ```tsx
 * // In your test file:
 * import { mockIcon } from '@synerise/ds-mocks/Icon/jest';
 *
 * mockIcon();
 *
 * // Then in your component:
 * <Icon iconName="InfoM" /> // Renders as: <div data-icon="InfoM">InfoM</div>
 * ```
 */
export const mockIcon = () => {
  jest.mock('@synerise/ds-icon', () => ({
    __esModule: true,
    default: jest.fn(
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
  }));
};

/**
 * Mocks the Icon component with a custom render function.
 *
 * @example
 * ```tsx
 * mockIconWithRender((props) => (
 *   <span data-custom-icon={props.iconName}>{props.iconName}</span>
 * ));
 * ```
 */
export const mockIconWithRender = (
  renderFn: (props: IconProps) => JSX.Element,
) => {
  jest.mock('@synerise/ds-icon', () => ({
    __esModule: true,
    default: jest.fn(renderFn),
  }));
};

/**
 * Mocks the Icon component to render nothing (null).
 * Useful when you don't need to test icon rendering.
 */
export const mockIconMinimal = () => {
  jest.mock('@synerise/ds-icon', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
