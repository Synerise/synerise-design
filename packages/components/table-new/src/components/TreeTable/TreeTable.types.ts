import { type TableProps } from '../../Table.types';

export type TreeTableProps<TData, TValue> = Omit<
  TableProps<TData, TValue>,
  'expandable'
> & {
  /**
   * Property name on row data containing child rows.
   * @default 'children'
   */
  childrenColumnName?: keyof TData;
  /**
   * Start with all rows expanded.
   */
  defaultExpandAllRows?: boolean;
  /**
   * Controlled expanded row keys. When provided, expand state is managed externally.
   */
  expandedRowKeys?: string[];
  /**
   * Called when a row's expand state changes (click on expander or row).
   */
  onExpandRow?: (key: string, expanded: boolean) => void;
  /**
   * Index of the column where the expand icon is rendered.
   * Set to -1 to hide the expand icon and skip indentation entirely.
   * @default 0
   */
  expandIconColumnIndex?: number;
  /**
   * Suppress the expander button on parent rows while still rendering
   * indentation and the leaf glyph (ChildRowLeftDownM) on every indented row.
   * Use when expand/collapse is not user-controllable but you still want
   * visual hierarchy matching the legacy antd table.
   * Ignored when `expandIconColumnIndex` is negative.
   * @default false
   */
  hideExpandIcon?: boolean;
};
