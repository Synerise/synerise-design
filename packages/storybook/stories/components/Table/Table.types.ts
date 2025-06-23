import { IconProps } from '@synerise/ds-icon';
import TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';

export type AdditionalColumnData = {
  id?: string;
  name?: string;
  type?: string;
  visible?: boolean;
  inactive?: boolean;
  icon?: IconProps;
  iconTooltip?: IconProps;
  textWrap?: string;
  tooltip?: TooltipExtendedProps;
};
