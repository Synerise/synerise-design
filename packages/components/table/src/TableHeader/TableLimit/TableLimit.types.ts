import type { ReactNode } from 'react';
import type { RequiredProps } from '@synerise/ds-utils';

import { Locale, RowSelection } from '../../Table.types';

export type TableLimitProps<T extends { key: string | number }> = {
  selection: RequiredProps<RowSelection<T>, 'limit'>;
  total: number;
  itemsMenu: ReactNode;
  locale: Locale;
};
