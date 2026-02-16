import { type AvatarProps as AntAvatarProps } from 'antd/lib/avatar';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';

import type { BadgeStatus } from '@synerise/ds-badge';
import { type TooltipProps } from '@synerise/ds-tooltip';

export type Color =
  | 'red'
  | 'green'
  | 'grey'
  | 'yellow'
  | 'blue'
  | 'pink'
  | 'mars'
  | 'orange'
  | 'fern'
  | 'cyan'
  | 'purple'
  | 'violet';

export type ColorHue =
  | '900'
  | '800'
  | '700'
  | '600'
  | '500'
  | '400'
  | '300'
  | '200'
  | '100'
  | '050';
export type Size = 'small' | 'medium' | 'large' | 'extraLarge' | undefined;

export type TooltipObject = Omit<TooltipProps, 'children'> & {
  // Backwards compatibility:
  name?: ReactNode;
  email?: ReactNode;
};

export type AvatarProps = Omit<AntAvatarProps, 'size' | 'icon' | 'src'> & {
  src?: string;
  /**
   * Aligns a badge with the avatar
   */
  hasStatus?: boolean;
  /**
   * The size of the avatar
   */
  size?: Size;
  /**
   * Provides a custom component as a child. If both are provided, the prop icon has a greater priority
   */
  iconComponent?: ReactNode;
  /**
   * Auto scale icons for sizes
   * @default true
   */
  iconScale?: boolean;
  /**
   * Background color of the avatar
   */
  backgroundColor?: Color | string;
  /**
   * Hue of the avatar background color
   */
  backgroundColorHue?: ColorHue;
  /**
   * Defines if the avatar is disabled
   */
  disabled?: boolean;
  /**
   * Text on a tooltip
   */
  tooltip?: TooltipObject | boolean;
  children?: ReactNode;
};

type DefinedAvatarProps = Pick<
  AvatarProps,
  'style' | 'disabled' | 'iconComponent' | 'size' | 'src'
> & {
  backgroundColor?: 'auto' | Color | string;
  badgeStatus?: BadgeStatus;
  text?: string;
  tooltip?: TooltipObject | boolean;
  onClick?: (event?: ReactMouseEvent<HTMLElement, MouseEvent>) => void;
};

export type ObjectAvatar = {
  name?: string | null;
  status?: string | null;
  description?: string | null;
  avatar?: string | null;
};

export type ObjectAvatarProps = DefinedAvatarProps & {
  object?: ObjectAvatar;
  color?: Color;
  children?: ReactNode;
};

export type UserAvatar = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  avatar?: string | null;
  avatarId?: string | number;
};

export type UserAvatarProps = DefinedAvatarProps & {
  user?: UserAvatar;
  children?: ReactNode;
};
