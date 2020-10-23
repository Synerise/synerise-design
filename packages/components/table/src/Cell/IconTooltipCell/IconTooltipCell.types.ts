import { IconProps } from '@synerise/ds-icon/dist/Icon.types';
import TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';

export interface Props {
  label: string | React.ReactNode;
  icon: IconProps;
  tooltipIcon: IconProps;
  tooltip?: TooltipExtendedProps;
}
