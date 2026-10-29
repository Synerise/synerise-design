import { SECTION_TYPES } from './SectionMessage.const';
import type { SectionType } from './SectionMessage.types';

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

// An unknown type from untyped consumer data renders as neutral, as it did
// before tokenisation.
const variantOf = (type: SectionType): string =>
  isSectionType(type)
    ? TYPE_TO_TOKEN_VARIANT[type]
    : TYPE_TO_TOKEN_VARIANT.neutral;

export const getColorBackground = (type: SectionType): string =>
  `var(--ds-section-message-variant-${variantOf(type)}-bg)`;

export const getColorIconAndBorderTop = (type: SectionType): string =>
  `var(--ds-section-message-variant-${variantOf(type)}-icon)`;

export const getColorBorder = (type: SectionType): string =>
  `var(--ds-section-message-variant-${variantOf(type)}-border)`;

export const getColorBorderTop = (type: SectionType): string =>
  `var(--ds-section-message-variant-${variantOf(type)}-bordertop)`;
