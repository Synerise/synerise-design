import type { IconProps } from '@synerise/ds-icon';
import type { TooltipProps } from '@synerise/ds-tooltip';

export type AdditionalColumnData = {
  id?: string;
  name?: string;
  type?: string;
  visible?: boolean;
  inactive?: boolean;
  icon?: IconProps;
  iconTooltip?: IconProps;
  textWrap?: string;
  tooltip?: TooltipProps;
};
