import { BadgeProps as AntBadgeProps } from 'antd/lib/badge';

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
  | 'violet'
  | string;

export type ColorHue = '900' | '800' | '700' | '600' | '500' | '400' | '300' | '200' | '100' | '050';

export type Status = 'active' | 'inactive' | 'blocked' | 'processing' | undefined;

export interface BadgeProps extends Omit<AntBadgeProps, 'status'> {
  flag?: boolean;
  status?: Status;
  outlined?: boolean;
  backgroundColor?: Color;
  textColor?: Color;
  backgroundColorHue?: ColorHue;
  textColorHue?: ColorHue;
  pulsing?: boolean;
}
