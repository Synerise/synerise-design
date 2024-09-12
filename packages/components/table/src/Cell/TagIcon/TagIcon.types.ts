import { ReactNode } from 'react';
import { WithHTMLAttributes } from '@synerise/ds-utils';

export type TagIconProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    children: ReactNode | ReactNode[];
  }
>;
/**
 *  @deprecated
 */
export type Props = TagIconProps;
