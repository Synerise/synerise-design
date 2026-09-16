import { type ItemSize, itemSizes } from '../../ListItem.types';

export const INDENT_WIDTH = 20;

/**
 * Sizes that render `description`. A 32px `default` row has no room for a second line,
 * so it stays excluded by construction — an allow-list rather than `size !== 'default'`,
 * which would silently opt every future size in.
 */
const SIZES_WITH_DESCRIPTION: readonly ItemSize[] = [
  itemSizes.LARGE,
  itemSizes.AUTO,
];

export const rendersDescription = (size?: ItemSize): boolean =>
  !!size && SIZES_WITH_DESCRIPTION.includes(size);
