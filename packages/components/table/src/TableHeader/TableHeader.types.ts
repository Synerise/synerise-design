import { type ReactNode } from 'react';

import { type Filter, type Locale, type RowSelection } from '../Table.types';

export type Props<T extends object> = {
  title?: ReactNode | (() => ReactNode);
  filters?: Filter[];
  selectedRows?: number;
  itemsMenu: ReactNode;
  selection?: RowSelection<T>;
  dataSource?: readonly T[];
  dataSourceFull?: T[];
  isCounterLoading?: boolean;
  searchComponent?: ReactNode;
  filterComponent?: ReactNode;
  rowKey?: Function | string;
  withBorderTop?: boolean;
  headerButton?: ReactNode;
  locale: Locale;
  renderSelectionTitle?: (
    selection?: RowSelection<T>,
    filters?: Filter[],
  ) => ReactNode;
  hideTitlePart?: boolean;
  dataSourceTotalCount?: number;
  childrenColumnName: keyof T;
  isLoading?: boolean;
};
