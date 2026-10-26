import { TagShape } from '@synerise/ds-tag';

/**
 * Status shapes and `medium_round` are deliberately kept out of the Storybook
 * controls and shape showcases. The component still supports them — this is a
 * documentation-visibility decision only.
 */
const isHiddenTagShape = (shape: TagShape) =>
  shape === TagShape.MEDIUM_ROUND || shape.startsWith('status_');

export const VISIBLE_TAG_SHAPES = Object.values(TagShape).filter(
  (shape) => !isHiddenTagShape(shape),
);
