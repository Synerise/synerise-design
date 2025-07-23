import type { ReactNode } from 'react';

import type { RequiredProps } from '@synerise/ds-utils';

import {
  type CustomCounterFn,
  type Locale,
  type RowSelection,
} from '../../Table.types';

export type TableLimitProps<T extends object> = {
  selection: RequiredProps<RowSelection<T>, 'limit'>;
  total: number;
  itemsMenu: ReactNode;
  locale: Locale;
  isCounterLoading?: boolean;
  renderCustomCounter?: CustomCounterFn;
};
