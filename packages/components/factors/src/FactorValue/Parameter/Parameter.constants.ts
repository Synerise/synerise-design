import { type CSSProperties } from 'react';

import { itemSizes } from '@synerise/ds-list-item';

export const LIST_STYLE: CSSProperties = {
  overflowX: 'unset',
  overflowY: 'unset',
};
export const NO_GROUP_NAME = 'NO_GROUP_NAME';
export const ITEM_SIZE = {
  [itemSizes.LARGE]: 50,
  [itemSizes.DEFAULT]: 32,
  title: 32,
};

export const DROPDOWN_HEIGHT = 420;
export const DROPDOWN_HEIGHT_BELOW_THRESHOLD = 350;
export const DROPDOWN_HEIGHT_THRESHOLD = 800;
export const SEARCH_HEGIHT = 53;
export const TABS_HEIGHT = 50;
export const SUBGROUP_HEADER_HEIGHT = 53;
