import { SECTION_TYPES } from './SectionMessage.const';
import { type SectionType } from './SectionMessage.types';

export const isSectionType = (type: string): type is SectionType => {
  return (SECTION_TYPES as readonly string[]).includes(type);
};
