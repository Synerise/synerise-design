import type { ReactNode } from 'react';

import type { IconProps } from '@synerise/ds-icon';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseIconLabelProps = {
  label?: ReactNode;
  icon?: IconProps;
  disabled?: boolean;
};

export type IconLabelProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseIconLabelProps
>;

/**
 *  @deprecated
 */
export type Props = IconLabelProps;
