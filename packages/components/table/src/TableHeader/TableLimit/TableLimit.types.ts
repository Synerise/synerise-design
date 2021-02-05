import * as React from 'react';
import { Locale, RowSelection } from '../../Table.types';

export interface TableLimitProps<T extends { key: React.ReactText }> {
  selection?: RowSelection<T>;
  total: number;
  itemsMenu: React.ReactNode;
  locale: Locale;
}
