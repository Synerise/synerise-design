import { BadgeProps as AntBadgeProps } from 'antd/lib/badge';
import { DefaultColor } from '@synerise/ds-core';

export const color = [
  'red',
  'green',
  'grey',
  'yellow',
  'blue',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
  'white',
  'transparent',
] as const;

export type Color = typeof color[number];

export type ColorHue = '900' | '800' | '700' | '600' | '500' | '400' | '300' | '200' | '100' | '050';

export type Status = 'active' | 'inactive' | 'blocked' | 'processing' | 'warning' | undefined;

export type BadgeProps = Omit<AntBadgeProps, 'status'> & {
  flag?: boolean;
  status?: Status;
  outlined?: boolean;
  backgroundColor?: Color;
  textColor?: Color;
  backgroundColorHue?: ColorHue;
  textColorHue?: ColorHue;
  pulsing?: boolean;
  customColor?: Color | DefaultColor;
};
