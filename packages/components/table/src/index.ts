/**
 * @deprecated `@synerise/ds-table` is deprecated and will not be migrated off antd.
 * Use `@synerise/ds-table-new` instead. See the "Migrating to
 * @synerise/ds-table-new" section in this package's README for the prop mapping
 * and the list of features that have no equivalent.
 */
export { default } from './Table';

/**
 * @deprecated Use `VirtualTable` from `@synerise/ds-table-new` instead. Note
 * `dataSource` → `data`, `scroll={{ y }}` → `maxHeight`, and `initialWidth` is
 * gone (column widths are measured).
 */
export { default as VirtualTable } from './VirtualTable/VirtualTable';

/**
 * @deprecated Use `TreeTable` from `@synerise/ds-table-new` instead.
 */
export { default as TreeTable } from './TreeTable/TreeTable';

/**
 * @deprecated Grouping has no equivalent in `@synerise/ds-table-new`. If you
 * need it, keep this package for now and raise it with the DS team.
 */
export { default as GroupedTable } from './GroupTable/GroupTable';

/**
 * @deprecated Use the flat cell exports from `@synerise/ds-table-new`
 * (`AvatarLabelCell`, `ActionCell`, …). Prop surfaces are unchanged.
 */
export * as TableCell from './Cell';

/**
 * @deprecated `@synerise/ds-table-new` has no exported `ItemsMenu` — pass the
 * batch-action nodes to its `itemsMenu` prop instead.
 */
export { default as ItemsMenu } from './ItemsMenu/ItemsMenu';

/**
 * @deprecated `@synerise/ds-table-new` has no exported `BackToTopButton` — use
 * its `showBackToTopButton` / `onBackToTop` props instead.
 */
export { default as BackToTopButton } from './InfiniteScroll/BackToTopButton';

/**
 * @deprecated Use `VirtualTableProps` / `VirtualTableRef` / `ColumnDef` from
 * `@synerise/ds-table-new` instead. `VirtualTableRef` has been reshaped — the
 * raw `virtualListRef` / `outerListRef` / `horizontalScrollRef` handles are gone.
 */
export type {
  Props as VirtualTableProps,
  VirtualTableRef,
  VirtualColumnType,
} from './VirtualTable/VirtualTable.types';

/**
 * @deprecated Use the equivalents from `@synerise/ds-table-new`. `Locale` →
 * `texts`, `RowSelection` → `SelectionConfig` + top-level `selectedRowKeys`, and
 * `ScrollProxyType` / `CustomizeScrollBodyInfo` have no equivalent.
 */
export type {
  RowSelection,
  RowType,
  SingleColumnSort,
  OnSortFn,
  Locale,
  DSColumnType,
  DSTableProps,
  ScrollProxyType,
  Selection,
  SelectionItem,
  CustomizeScrollBodyInfo,
} from './Table.types';

/**
 * @deprecated Grouping has no equivalent in `@synerise/ds-table-new`.
 */
export { GROUP_BY } from './GroupTable/GroupTable.types';
