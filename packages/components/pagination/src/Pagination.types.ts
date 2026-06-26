import { type CSSProperties, type ReactNode } from 'react';

import { type DataAttributes } from '@synerise/ds-utils';

export type PaginationItemType =
  | 'page'
  | 'prev'
  | 'next'
  | 'jump-prev'
  | 'jump-next';

export type PaginationLocale = {
  /** Trailing label after a page number (kept empty by default). */
  page?: string;
  /** "Go to" jumper prefix. */
  jump_to?: string;
  /** Per-page label in the size changer, e.g. `/ page`. */
  items_per_page?: string;
};

export type PaginationProps = {
  /** Controlled current page. */
  current?: number;
  /** Uncontrolled initial page. */
  defaultCurrent?: number;
  /** Total number of items. */
  total?: number;
  /** Controlled page size. */
  pageSize?: number;
  /** Uncontrolled initial page size. */
  defaultPageSize?: number;
  /** Fired when the page or page size changes. */
  onChange?: (page: number, pageSize: number) => void;
  /**
   * Show the page-size `<Select>`. When omitted, follows antd's behaviour and auto-shows once
   * `total > 50`. An explicit `true`/`false` always wins.
   */
  showSizeChanger?: boolean;
  /** Page-size options for the size changer. */
  pageSizeOptions?: (string | number)[];
  /** Fired when the page size changes via the size changer. */
  onShowSizeChange?: (current: number, size: number) => void;
  /** Show the quick-jumper input. */
  showQuickJumper?: boolean;
  /** Render a total/range summary. */
  showTotal?: (total: number, range: [number, number]) => ReactNode;
  /** Use a smaller window of page items. */
  showLessItems?: boolean;
  /** Disable all controls. */
  disabled?: boolean;
  /** Hide the pager when there is only a single page. */
  hideOnSinglePage?: boolean;
  locale?: PaginationLocale;
  /**
   * Accepted for back-compat; the component always renders its own DS nav controls, so a custom
   * `itemRender` has no effect (matching the previous behaviour).
   */
  itemRender?: (
    page: number,
    type: PaginationItemType,
    element: ReactNode,
  ) => ReactNode;
  className?: string;
  style?: CSSProperties;
} & DataAttributes;
