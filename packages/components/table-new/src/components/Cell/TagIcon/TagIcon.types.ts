import { type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseTagIconProps = {
  children: ReactNode | ReactNode[];
  disabled?: boolean;
};

export type TagIconProps = WithHTMLAttributes<HTMLDivElement, BaseTagIconProps>;
/**
 *  @deprecated
 */
export type Props = TagIconProps;
