import { ReactText, ReactNode } from 'react';
import { Filter, Locale, RowSelection } from '../Table.types';

export type Props<T extends { key: ReactText }> = {
  title?: ReactNode;
  filters?: Filter[];
  selectedRows?: number;
  itemsMenu: ReactNode;
  selection?: RowSelection<T>;
  dataSource: T[];
  dataSourceFull?: T[];
  searchComponent?: ReactNode;
  filterComponent?: ReactNode;
  rowKey?: Function | string;
  withBorderTop?: boolean;
  headerButton?: ReactNode;
  locale: Locale;
  renderSelectionTitle?: (selection?: RowSelection<T>, filters?: Filter[]) => ReactNode;
  hideTitlePart?: boolean;
  dataSourceTotalCount?: number;
};
