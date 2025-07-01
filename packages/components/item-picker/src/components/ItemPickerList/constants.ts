import type { CSSProperties } from 'react';

import { itemSizes } from '@synerise/ds-list-item';

import type { BaseItemType } from '../ItemPickerNew/ItemPickerNew.types';

export const LIST_STYLE: CSSProperties = {
  overflowX: 'unset',
  overflowY: 'unset',
};

export const ITEM_SIZE = {
  [itemSizes.LARGE]: 50,
  [itemSizes.DEFAULT]: 32,
  title: 32,
};

export const DEFAULT_HEIGHT = 420;
export const DEFAULT_HEIGHT_BELOW_THRESHOLD = 350;
export const DEFAULT_HEIGHT_THRESHOLD = 800;

export const SECTION_HEADER_HEIGHT = 53;
export const SEARCH_BAR_HEIGHT = 53;
export const FOOTER_HEIGHT = 48;
export const LIST_INNER_PADDING = 8;

export const FIRST_PAGE = 0;
export const ITEMS_PER_PAGE = 150;
export const ITEMS_PER_SECTION = 4;
export const ITEMS_PER_SECTION_IN_SEARCH = 4;

export const TITLE_PATH_SEPARATOR = ' - ';

export const GET_ITEM_KEY = <ItemType extends BaseItemType>(item: ItemType) => {
  return item?.id || JSON.stringify(item);
};
