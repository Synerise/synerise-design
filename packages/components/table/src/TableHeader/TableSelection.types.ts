import { ReactText } from 'react';
import { RowSelection, Locale } from '../Table.types';

export type Props<T extends { key: ReactText }> = {
  selection?: RowSelection<T>;
  dataSource: T[];
  dataSourceFull?: T[];
  locale?: Locale;
  rowKey?: Function | string;
  childrenColumnName: string;
};
