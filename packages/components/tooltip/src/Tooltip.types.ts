import * as React from 'react';

export type tooltipTypes = 'default' | 'icon' | 'largeSimple' | 'tutorial';

export default interface TooltipExtendedProps {
  type?: tooltipTypes;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  theme: { [k: string]: string };
}

export const typesOverlayClasses = {
  default: 'defaultOverlayClass',
  icon: 'iconOverlayClass',
  largeSimple: 'largeSimpleOverlayClass',
  tutorial: 'tutorialOverlayClass',
};
