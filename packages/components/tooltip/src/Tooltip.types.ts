import * as React from 'react';

export type tooltipTypes = 'default' | 'icon' | 'largeSimple' | 'tutorial';
export type descriptionType = string /* | [string] */ | React.ReactNode /* | [React.ReactNode] */;
// TODO support descriptionType as array of element
export default interface TooltipExtendedProps {
  type?: tooltipTypes;
  icon?: React.ReactNode;
  title?: string | React.ReactNode;
  description?: descriptionType;
  theme: { [k: string]: string };
}
