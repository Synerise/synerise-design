import { IconProps } from '@synerise/ds-icon';
import TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';
import { WithHTMLAttributes } from '@synerise/ds-utils';

export type IconTooltipCellProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    label?: React.ReactNode;
    icon?: IconProps;
    tooltipIcon?: IconProps;
    tooltip?: TooltipExtendedProps;
  }
>;

/**
 *  @deprecated
 */
export type Props = IconTooltipCellProps;
