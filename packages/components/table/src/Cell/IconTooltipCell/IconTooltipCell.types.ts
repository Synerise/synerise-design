import { IconProps } from '@synerise/ds-icon';
import TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';

export interface Props {
  label: string | React.ReactNode;
  icon: IconProps;
  tooltipIcon?: IconProps;
  tooltip?: TooltipExtendedProps;
}
