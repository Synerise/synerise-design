import type { ReactNode } from 'react';
import type { IconProps } from '@synerise/ds-icon';
import type { TooltipProps } from '@synerise/ds-tooltip';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type IconTooltipCellProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    label?: ReactNode;
    icon?: IconProps;
    tooltipIcon?: IconProps;
    tooltip?: TooltipProps;
    disabled?: boolean;
  }
>;

/**
 *  @deprecated
 */
export type Props = IconTooltipCellProps;
