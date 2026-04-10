import { type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type ContentAlign = 'left' | 'right' | 'center';

export type BaseActionCellProps = {
  children: ReactNode | ReactNode[];
  gapSize?: number;
  contentAlign?: ContentAlign;
};

export type ActionCellProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseActionCellProps
>;

/**
 *  @deprecated
 */
export type Props = ActionCellProps;
