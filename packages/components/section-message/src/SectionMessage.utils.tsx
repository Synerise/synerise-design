import { SECTION_TYPES } from './SectionMessage.const';
import { type SectionType } from './SectionMessage.types';

export const isSectionType = (type: string): type is SectionType => {
  return (SECTION_TYPES as readonly string[]).includes(type);
};

const TYPE_TO_TOKEN_VARIANT: Record<SectionType, string> = {
  positive: 'success',
  negative: 'error',
  notice: 'warning',
  neutral: 'informative',
  supply: 'supply',
  service: 'service',
  entity: 'entity',
};

export const getColorBackground = (type: SectionType): string =>
  `var(--ds-section-message-variant-${TYPE_TO_TOKEN_VARIANT[type]}-bg)`;

export const getColorIconAndBorderTop = (type: SectionType): string =>
  `var(--ds-section-message-variant-${TYPE_TO_TOKEN_VARIANT[type]}-icon)`;

export const getColorBorder = (type: SectionType): string =>
  `var(--ds-section-message-variant-${TYPE_TO_TOKEN_VARIANT[type]}-border)`;

export const getColorBorderTop = (type: SectionType): string =>
  `var(--ds-section-message-variant-${TYPE_TO_TOKEN_VARIANT[type]}-bordertop)`;

export const getColorTextHeader = (type: SectionType): string =>
  `var(--ds-section-message-variant-${TYPE_TO_TOKEN_VARIANT[type]}-text-header)`;

export const getColorTextDescription = (type: SectionType): string =>
  `var(--ds-section-message-variant-${TYPE_TO_TOKEN_VARIANT[type]}-text-description)`;
