import { type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseStarCellProps = {
  children: ReactNode | ReactNode[];
  active?: boolean;
  onClick?: () => void;
  /** @deprecated theme will be read from Theme Provider */
  theme?: {
    [key: string]: string;
  };
  starTooltip?: ReactNode;
};

export type StarCellProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseStarCellProps
>;

/**
 *  @deprecated
 */
export type Props = StarCellProps;
