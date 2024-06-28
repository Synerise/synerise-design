import * as React from 'react';
import { RowSelection, Locale } from '../Table.types';

export interface Props<T extends { key: React.ReactText }> {
  selection?: RowSelection<T>;
  dataSource: T[];
  dataSourceFull?: T[];
  locale?: Locale;
  rowKey?: Function | string;
  childrenColumnName: string;
}
