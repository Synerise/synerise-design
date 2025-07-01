import { type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type StarCellProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    children: ReactNode | ReactNode[];
    active?: boolean;
    onClick?: () => void;
    theme: {
      [key: string]: string;
    };
    starTooltip?: ReactNode;
  }
>;

/**
 *  @deprecated
 */
export type Props = StarCellProps;
