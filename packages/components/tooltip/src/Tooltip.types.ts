import * as React from 'react';

export type tooltipTypes = 'default' | 'icon' | 'largeSimple' | 'tutorial' | 'avatar' | 'button' | 'header-label' | 'status';
export type descriptionType = string | React.ReactNode;
export type Tutorial = {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
};
// TODO support descriptionType as array of element
export default interface TooltipExtendedProps {
  type?: tooltipTypes;
  icon?: React.ReactNode;
  status?: React.ReactNode;
  title?: string | React.ReactNode;
  description?: descriptionType;
  tutorials?: Tutorial[];
  tutorialAutoplay?: boolean;
  tutorialAutoplaySpeed?: number;
  offset?: 'default' | 'small';
  theme: { [k: string]: string };
  button?: {
    label?: string | React.ReactNode;
    buttonIcon?: React.ReactNode;
    onClick: () => void;
  };
}
