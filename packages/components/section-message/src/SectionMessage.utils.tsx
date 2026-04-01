import { type ThemePropsVars } from '@synerise/ds-core';

import { SECTION_TYPES } from './SectionMessage.const';
import { type SectionType } from './SectionMessage.types';

export const isSectionType = (type: string): type is SectionType => {
  return (SECTION_TYPES as readonly string[]).includes(type);
};

const TYPE_TO_TOKEN_VARIANT: Partial<Record<SectionType, string>> = {
  positive: 'success',
  negative: 'error',
  notice: 'warning',
  neutral: 'informative',
};

const PALETTE_FALLBACK: Partial<Record<SectionType, string>> = {
  supply: 'violet',
  service: 'purple',
  entity: 'cyan',
};

export const getColorBackground = (
  type: SectionType,
  theme: ThemePropsVars,
): string => {
  const variant = TYPE_TO_TOKEN_VARIANT[type];
  if (variant) {
    return `var(--ds-section-message-variant-${variant}-bg)`;
  }
  const color = PALETTE_FALLBACK[type] ?? 'grey';
  return theme.palette[`${color}-050`];
};

export const getColorIconAndBorderTop = (
  type: SectionType,
  theme: ThemePropsVars,
): string => {
  const variant = TYPE_TO_TOKEN_VARIANT[type];
  if (variant) {
    return `var(--ds-section-message-variant-${variant}-icon)`;
  }
  const color = PALETTE_FALLBACK[type] ?? 'grey';
  return theme.palette[`${color}-600`];
};

export const getColorBorder = (
  type: SectionType,
  theme: ThemePropsVars,
): string => {
  const variant = TYPE_TO_TOKEN_VARIANT[type];
  if (variant) {
    return `var(--ds-section-message-variant-${variant}-border)`;
  }
  const color = PALETTE_FALLBACK[type] ?? 'grey';
  return theme.palette[`${color}-200`];
};

export const getColorBorderTop = (
  type: SectionType,
  theme: ThemePropsVars,
): string => {
  const variant = TYPE_TO_TOKEN_VARIANT[type];
  if (variant) {
    return `var(--ds-section-message-variant-${variant}-borderTop)`;
  }
  const color = PALETTE_FALLBACK[type] ?? 'grey';
  return theme.palette[`${color}-600`];
};

export const getColorTextHeader = (type: SectionType): string => {
  const variant = TYPE_TO_TOKEN_VARIANT[type];
  if (variant) {
    return `var(--ds-section-message-variant-${variant}-text-header)`;
  }
  return 'inherit';
};

export const getColorTextDescription = (type: SectionType): string => {
  const variant = TYPE_TO_TOKEN_VARIANT[type];
  if (variant) {
    return `var(--ds-section-message-variant-${variant}-text-description)`;
  }
  return 'inherit';
};
