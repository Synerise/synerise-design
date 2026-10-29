import {
  getColorBackground,
  getColorBorder,
  getColorBorderTop,
  getColorIconAndBorderTop,
} from '../SectionMessage.utils';
import type { SectionType } from '../SectionMessage.types';

const GETTERS = [
  getColorBackground,
  getColorBorder,
  getColorBorderTop,
  getColorIconAndBorderTop,
];

describe('SectionMessage colour helpers', () => {
  it.each<[SectionType, string]>([
    ['positive', 'success'],
    ['negative', 'error'],
    ['notice', 'warning'],
    ['neutral', 'informative'],
    ['supply', 'supply'],
    ['service', 'service'],
    ['entity', 'entity'],
  ])('maps the %s type to the %s token variant', (type, variant) => {
    GETTERS.forEach((getColor) => {
      expect(getColor(type)).toMatch(
        new RegExp(`^var\\(--ds-section-message-variant-${variant}-[\\w-]+\\)$`),
      );
    });
  });

  it('falls back to the informative variant for an unknown type', () => {
    const unknown = 'not-a-type' as SectionType;

    GETTERS.forEach((getColor) => {
      expect(getColor(unknown)).toBe(getColor('neutral'));
    });
  });
});
