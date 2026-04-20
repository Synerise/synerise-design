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
   * Set to -1 to hide the expand icon entirely.
   * @default 0
   */
  expandIconColumnIndex?: number;
};
