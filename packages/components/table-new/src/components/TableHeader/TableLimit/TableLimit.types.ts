import type { ReactNode } from 'react';

import type { RequiredProps } from '@synerise/ds-utils';

import type {
  CustomCounterFn,
  SelectionConfig,
  TableLimitTexts,
} from '../../../Table.types';

export type TableLimitProps<TData> = {
  selection: RequiredProps<SelectionConfig<TData>, 'limit'>;
  itemsMenu: ReactNode;
  texts: TableLimitTexts;
  isCounterLoading?: boolean;
  renderCustomCounter?: CustomCounterFn;
};
