import type { CSSProperties } from 'react';

import { type ItemSize, itemSizes } from '@synerise/ds-list-item';

export const LIST_STYLE: CSSProperties = {
  overflowX: 'unset',
  overflowY: 'unset',
};
export const NO_GROUP_NAME = 'NO_GROUP_NAME';
/**
 * Row height estimates. Typed exhaustively over `ItemSize` on purpose: a new size must fail
 * the build here rather than silently yield an undefined row offset. `auto` has no fixed
 * height — 32 is its `min-height` floor.
 *
 * `ParameterDropdown`'s `getItemSize` only ever reads the `default` entry, so this dropdown
 * does not honour a per-item `size` at all — not `large` either. That is a pre-existing gap,
 * not something `auto` introduced.
 */
export const ITEM_SIZE: Record<ItemSize, number> & { title: number } = {
  [itemSizes.LARGE]: 50,
  [itemSizes.DEFAULT]: 32,
  [itemSizes.AUTO]: 32,
  title: 32,
};

export const DROPDOWN_HEIGHT = 420;
export const DROPDOWN_HEIGHT_BELOW_THRESHOLD = 350;
export const DROPDOWN_HEIGHT_THRESHOLD = 800;
export const SEARCH_HEGIHT = 53;
export const TABS_HEIGHT = 50;
export const SUBGROUP_HEADER_HEIGHT = 53;
