import type { ReactNode } from 'react';
import type { IconProps } from '@synerise/ds-icon';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type IconLabelProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    label?: ReactNode;
    icon?: IconProps;
    disabled?: boolean;
  }
>;

/**
 *  @deprecated
 */
export type Props = IconLabelProps;
