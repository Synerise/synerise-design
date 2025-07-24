import type { Locale, RowSelection } from '../Table.types';

export type TableSelectionProps<T extends object> = {
  selection?: RowSelection<T>;
  dataSource: readonly T[];
  dataSourceFull?: T[];
  locale?: Locale;
  rowKey?: Function | string;
  childrenColumnName: keyof T;
  hasSelectionLimit?: boolean;
};

/**
 * @deprecated use TableSelectionProps instead
 */
export type Props<T extends object> = TableSelectionProps<T>;
