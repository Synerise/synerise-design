import { TagShape } from '@synerise/ds-tags';

export const getTagNameForShape = (shape: TagShape, name?: string) => {
  const singleCharShapes = ['single_character_round', 'single_character_square'];
  const tagName = name || 'Tag Name';
  return singleCharShapes.includes(shape) ? tagName.charAt(0) : tagName;
};
