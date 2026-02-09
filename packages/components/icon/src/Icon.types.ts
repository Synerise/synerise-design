import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';
import { type StyledComponent } from 'styled-components';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

import type { IconName } from './useIconComponent';

export type { IconName };

export type BaseIconProps = {
  color?: string;
  /**
   * Icon name - use this to render an icon by its name (e.g., 'InfoM', 'AddM').
   * This is the recommended way to use icons.
   * @example
   * ```tsx
   * <Icon iconName="InfoM" />
   * <Icon iconName="AddM" size={24} color="blue" />
   * ```
   */
  iconName?: IconName;
  /**
   * Display name for the icon (used as title attribute)
   */
  name?: string;
  size?: string | number;
  stroke?: boolean;
  /**
   * @deprecated Use the `iconName` prop instead with the icon name as a string.
   * @example
   * // Before (deprecated):
   * <Icon component={<InfoM />} />
   *
   * // After (recommended):
   * <Icon iconName="InfoM" />
   */
  component?: ReactNode;
};

export type IconProps = WithHTMLAttributes<HTMLDivElement, BaseIconProps>;

export type StyledIcon<CustomProps extends object = object> = StyledComponent<
  ForwardRefExoticComponent<IconProps & RefAttributes<HTMLDivElement>>,
  object,
  CustomProps,
  never
>;
