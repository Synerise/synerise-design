import type { RowSelection, Locale } from '../Table.types';

export type TableSelectionProps<T extends { key: string | number }> = {
  selection?: RowSelection<T>;
  dataSource: T[];
  dataSourceFull?: T[];
  locale?: Locale;
  rowKey?: Function | string;
  childrenColumnName: string;
  hasSelectionLimit?: boolean;
};

/**
 * @deprecated use TableSelectionProps instead
 */
export type Props<T extends { key: string | number }> = TableSelectionProps<T>;
