import { ReactNode } from 'react';
import { WithHTMLAttributes } from '@synerise/ds-utils';

export type ContentAlign = 'left' | 'right' | 'center';
export type ActionCellProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    children: ReactNode | ReactNode[];
    gapSize?: number;
    contentAlign?: ContentAlign;
  }
>;

/**
 *  @deprecated
 */
export type Props = ActionCellProps;
