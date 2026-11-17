import type {
  CSSProperties,
  MouseEventHandler,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react';

import type { BadgeStatus } from '@synerise/ds-badge';
import type { TooltipProps } from '@synerise/ds-tooltip';
import type { DataAttributes } from '@synerise/ds-utils';

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

export type Size = 'small' | 'medium' | 'large' | 'extraLarge' | undefined;

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

export type Shape = 'circle' | 'square';

/** What an avatar shows, which decides its background: an image, the icon tile, a text colour or none. */
export type AvatarContent = 'image' | 'icon' | 'text' | 'custom';

export type TooltipObject = Omit<TooltipProps, 'children'> & {
  // Backwards compatibility:
  name?: ReactNode;
  email?: ReactNode;
};

export type AvatarProps = {
  /**
   * Shape of the avatar
   * @default 'circle'
   */
  shape?: Shape;
  /**
   * Image source URL; an empty string is treated as no image
   */
  src?: string;
  /**
   * Alternative text for the image variant
   */
  alt?: string;
  /**
   * Aligns a badge with the avatar
   */
  hasStatus?: boolean;
  /**
   * Draws the tile border and shadow around an image. An icon always has them, and a text avatar
   * ignores this because it already has a colour of its own.
   * @default false
   */
  hasTile?: boolean;
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
   * @deprecated Has no effect: the content decides the background (image, icon tile, or a colour
   * from the text's first letter). Will be removed once consumers stop passing it.
   */
  backgroundColor?: Color | string;
  /**
   * @deprecated Has no effect; see `backgroundColor`.
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
  className?: string;
  style?: CSSProperties;
  id?: string;
  onClick?: MouseEventHandler<HTMLElement>;
} & DataAttributes;

type DefinedAvatarProps = Pick<
  AvatarProps,
  'style' | 'disabled' | 'hasTile' | 'iconComponent' | 'size' | 'src'
> & {
  /**
   * @deprecated Has no effect: the content decides the background. Will be removed once consumers
   * stop passing it.
   */
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
