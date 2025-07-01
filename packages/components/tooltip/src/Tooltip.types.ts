import { type TooltipPropsWithTitle } from 'antd/lib/tooltip';
import { type ReactNode } from 'react';

export type TooltipTypes = 'default' | 'largeSimple' | 'largeScrollable';

export type TooltipExtendedProps = {
  type?: TooltipTypes;
  icon?: ReactNode;
  status?: ReactNode;
  title?: ReactNode;
  shortCuts?: ReactNode | ReactNode[];
  image?: ReactNode;
  description?: ReactNode;
  timeToHideAfterClick?: number;
  offset?: 'default' | 'small';
  button?: ReactNode;
  render?: () => ReactNode;
  disabled?: boolean;
};
export default TooltipExtendedProps;

export type TooltipProps = Omit<TooltipPropsWithTitle, 'title'> &
  TooltipExtendedProps;
