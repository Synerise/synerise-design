import { AvatarProps as AntAvatarProps } from 'antd/lib/avatar';
import * as React from 'react';

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
  tooltip?: {
    title?: React.ReactNode;
    description?: React.ReactNode;
    status?: React.ReactNode;
    // Backward compatibility:
    name?: React.ReactNode;
    email?: React.ReactNode;
  };
}

type DefinedAvatarProps = Pick<
  AvatarProps,
  'style' | 'disabled' | 'tooltip' | 'backgroundColor' | 'iconComponent' | 'size' | 'src'
> & {
  badgeStatus?: string;
  color?: Color;
  text?: string;
};

export type ObjectAvatarProps = DefinedAvatarProps & {
  objectName?: string;
  objectStatus?: string;
  objectDescription?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export type UserAvatarProps = DefinedAvatarProps & {
  email?: string;
  firstName?: string;
  lastName?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
