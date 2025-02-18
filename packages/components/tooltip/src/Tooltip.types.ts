import { ReactNode } from 'react';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';

export type tooltipTypes =
  | 'default'
  | 'icon'
  | 'largeSimple'
  | 'largeScrollable'
  | 'tutorial'
  | 'avatar'
  | 'button'
  | 'header-label'
  | 'status';
export type descriptionType = ReactNode;
export type Tutorial = {
  title: ReactNode;
  description: ReactNode;
};
// TODO support descriptionType as array of element
export default interface TooltipExtendedProps {
  type?: tooltipTypes;
  icon?: ReactNode;
  status?: ReactNode;
  title?: ReactNode;
  image?: ReactNode;
  description?: descriptionType;
  tutorials?: Tutorial[];
  tutorialAutoplay?: boolean;
  tutorialAutoplaySpeed?: number;
  timeToHideAfterClick?: number;
  offset?: 'default' | 'small';
  button?: {
    label?: ReactNode;
    buttonIcon?: ReactNode;
    onClick: () => void;
  };
  render?: () => ReactNode;
}

export type TooltipProps = Omit<TooltipPropsWithTitle, 'title'> & TooltipExtendedProps;
