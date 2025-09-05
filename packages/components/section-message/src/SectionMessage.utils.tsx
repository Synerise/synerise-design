import { type ThemePropsVars } from '@synerise/ds-core';

import { SECTION_TYPES } from './SectionMessage.const';
import { type SectionType } from './SectionMessage.types';

export const isSectionType = (type: string): type is SectionType => {
  return (SECTION_TYPES as readonly string[]).includes(type);
};

export const getColorBackground = (
  type: SectionType,
  theme: ThemePropsVars,
): string => {
  if (type === 'positive') {
    return theme.palette['green-050'];
  }
  if (type === 'negative') {
    return theme.palette['red-050'];
  }
  if (type === 'notice') {
    return theme.palette['yellow-050'];
  }
  if (type === 'service') {
    return theme.palette['purple-050'];
  }
  if (type === 'supply') {
    return theme.palette['violet-050'];
  }
  if (type === 'entity') {
    return theme.palette['cyan-050'];
  }
  return theme.palette[`grey-050`];
};
export const getColorIconAndBorderTop = (
  type: SectionType,
  theme: ThemePropsVars,
): string => {
  if (type === 'positive') {
    return theme.palette['green-600'];
  }
  if (type === 'negative') {
    return theme.palette['red-600'];
  }
  if (type === 'notice') {
    return theme.palette['yellow-600'];
  }
  if (type === 'service') {
    return theme.palette['purple-600'];
  }
  if (type === 'supply') {
    return theme.palette['violet-600'];
  }
  if (type === 'entity') {
    return theme.palette['cyan-600'];
  }
  return theme.palette[`grey-600`];
};
export const getColorBorder = (
  type: SectionType,
  theme: ThemePropsVars,
): string => {
  if (type === 'positive') {
    return theme.palette['green-200'];
  }
  if (type === 'negative') {
    return theme.palette['red-200'];
  }
  if (type === 'notice') {
    return theme.palette['yellow-200'];
  }
  if (type === 'service') {
    return theme.palette['purple-200'];
  }
  if (type === 'supply') {
    return theme.palette['violet-200'];
  }
  if (type === 'entity') {
    return theme.palette['cyan-200'];
  }
  return theme.palette[`grey-200`];
};
