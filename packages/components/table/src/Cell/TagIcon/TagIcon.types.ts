import { type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type TagIconProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    children: ReactNode | ReactNode[];
    disabled?: boolean;
  }
>;
/**
 *  @deprecated
 */
export type Props = TagIconProps;
