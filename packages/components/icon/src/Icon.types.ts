import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';
import { type StyledComponent } from 'styled-components';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseIconProps = {
  color?: string;
  name?: string;
  size?: string | number;
  stroke?: boolean;
  component?: ReactNode;
};

export type IconProps = WithHTMLAttributes<HTMLDivElement, BaseIconProps>;

export type StyledIcon<CustomProps extends object = object> = StyledComponent<
  ForwardRefExoticComponent<IconProps & RefAttributes<HTMLDivElement>>,
  object,
  CustomProps,
  never
>;
