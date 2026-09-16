import { type ItemSize } from './ListItem.types';

/**
 * Row height in px per `size`. For `'auto'` this is the `min-height` floor the CSS
 * applies (`baseStyles` in `Text.styles.tsx` reads this map), i.e. a lower bound and
 * the estimate a virtualized list should start from — the real height is content-driven
 * and must be measured. `@synerise/ds-select`'s `OptionList` is the reference pattern.
 */
export const LIST_ITEM_SIZE_MAPPING: Record<ItemSize, number> = {
  default: 32,
  large: 50,
  auto: 32,
};
