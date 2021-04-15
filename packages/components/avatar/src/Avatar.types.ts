import * as React from 'react';
import { AvatarProps as AntAvatarProps } from 'antd/lib/avatar';
import { TooltipProps } from '@synerise/ds-tooltip/dist/Tooltip.types';

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

export type ColorHue = '900' | '800' | '700' | '600' | '500' | '400' | '300' | '200' | '100' | '050';
export type Size = 'small' | 'medium' | 'large' | 'extraLarge' | undefined;

export type TooltipObject = TooltipProps & {
  // Backwards compatibility:
  name?: React.ReactNode;
  email?: React.ReactNode;
};

export interface AvatarProps extends Omit<AntAvatarProps, 'size' | 'icon'> {
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
  iconComponent?: React.ReactNode;
  /**
   * Auto scale icons for sizes
   * @default true
   */
  iconScale?: boolean;
  /**
   * Background color of the avatar
   */
  backgroundColor?: Color;
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
}

type DefinedAvatarProps = Pick<AvatarProps, 'style' | 'disabled' | 'iconComponent' | 'size' | 'src'> & {
  backgroundColor?: 'auto' | Color;
  badgeStatus?: string;
  text?: string;
  tooltip?: TooltipObject | boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
};

export type UserAvatar = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  avatar?: string | null;
};

export type UserAvatarProps = DefinedAvatarProps & {
  user?: UserAvatar;
};
