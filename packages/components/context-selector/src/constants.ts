import { type ItemSize, itemSizes } from '@synerise/ds-list-item';

export const NO_GROUP_NAME = 'NO_GROUP_NAME';
/**
 * Row height estimates. Typed exhaustively over `ItemSize` on purpose: a new size must fail
 * the build here rather than silently yield an undefined row offset. `auto` has no fixed
 * height — 32 is its `min-height` floor, and the real height is measured.
 */
export const ITEM_SIZE: Record<ItemSize, number> & { title: number } = {
  [itemSizes.LARGE]: 50,
  [itemSizes.DEFAULT]: 32,
  [itemSizes.AUTO]: 32,
  title: 32,
};
export const DROPDOWN_HEIGHT = 420;
export const DROPDOWN_HEIGHT_BELOW_THRESHOLD = 350;
export const DROPDOWN_HEIGHT_THRESHOLD = 900;
export const SEARCH_HEIGHT = 53;
export const TABS_HEIGHT = 50;
export const SUBGROUP_HEADER_HEIGHT = 53;
export const MIN_LIST_WINDOW_HEIGHT = 300;
