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
   * Render an icon by its **string name** (e.g. 'InfoM', 'AddM').
   *
   * Use this **only when the icon is not known at build time** — e.g. the name comes from an API,
   * a database, or user configuration. For icons you know at build time, prefer `component`:
   * icons requested by name are resolved from the whole icon set and cannot be tree-shaken out of
   * the app bundle.
   * @example
   * ```tsx
   * // name only known at runtime (e.g. returned by the backend)
   * <Icon iconName={iconNameFromApi} />
   * ```
   */
  iconName?: IconName;
  /**
   * Display name for the icon (used as the `title` attribute)
   */
  name?: string;
  size?: string | number;
  stroke?: boolean;
  /**
   * **Preferred way to render a known icon.** Import the icon component and pass it here, so only
   * the icons you actually use are bundled (unused icons are tree-shaken from the app bundle).
   * Reach for `iconName` only when the icon is not known until runtime.
   * @example
   * ```tsx
   * import Icon, { InfoM } from '@synerise/ds-icon';
   *
   * <Icon component={<InfoM />} />
   * ```
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
