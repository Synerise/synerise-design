import { ReactNode, ReactText } from 'react';
import { Locale, RowSelection } from '../../Table.types';

export type TableLimitProps<T extends { key: ReactText }> = {
  selection?: RowSelection<T>;
  total: number;
  itemsMenu: ReactNode;
  locale: Locale;
};
