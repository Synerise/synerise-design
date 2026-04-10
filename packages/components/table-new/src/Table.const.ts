import {
  type OnSortFn,
  type SelectionAll,
  type SelectionInvert,
  type StickyData,
} from './Table.types';

export const EXPANDED_ROW_PROPERTY = 'expandedChild';

export const SELECTION_ALL: SelectionAll = 'SELECTION_ALL';
export const SELECTION_INVERT: SelectionInvert = 'SELECTION_INVERT';

export const DEFAULT_CELL_HEIGHT = 73;

export const SELECTION_COLUMN_ID = 'SELECTION_COLUMN_ID';
export const ACTION_COLUMN_ID = 'ACTION_COLUMN_ID';

export const INFINITE_SCROLL_TRIGGER_THRESHOLD = 500;
export const INFINITE_SCROLL_PADDING_START = 101;

export const DEFAULT_PAGINATION_CONFIG = {
  initialState: { pagination: { pageSize: 10 } },
};

export const INFINITE_LOADER_ITEM_HEIGHT = 64;

export const DEFAULT_STICKY_VALUE: StickyData = {
  containerPaddingTop: 0,
  titleBarHeight: 0,
  columnHeadersHeight: 0,
  isRevealed: false,
};

export const BOTTOM_BORDER_WIDTH = 1;

export const EMPTY_SORT_STATE: Parameters<OnSortFn> = [
  { columnKey: '', order: null },
  {},
];
