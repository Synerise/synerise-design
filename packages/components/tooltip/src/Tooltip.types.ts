import * as React from 'react';

export type tooltipTypes = 'default' | 'icon' | 'largeSimple' | 'tutorial' | 'avatar';
export type descriptionType = string | React.ReactNode;
export type Tutorial = {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
};
// TODO support descriptionType as array of element
export default interface TooltipExtendedProps {
  type?: tooltipTypes;
  icon?: React.ReactNode;
  title?: string | React.ReactNode;
  description?: descriptionType;
  tutorials?: Tutorial[];
  tutorialAutoplay?: boolean;
  tutorialAutoplaySpeed?: number;
  offset?: 'default' | 'small';
  theme: { [k: string]: string };
}
