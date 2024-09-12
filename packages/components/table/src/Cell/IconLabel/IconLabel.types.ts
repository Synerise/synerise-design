import { IconProps } from '@synerise/ds-icon';
import { WithHTMLAttributes } from '@synerise/ds-utils';

export type IconLabelProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    label: string;
    icon: IconProps;
  }
>;

/**
 *  @deprecated
 */
export type Props = IconLabelProps;
