import type { SortDirection } from '@tanstack/react-table';
import React from 'react';

import Icon, {
  ArrangeM,
  SortAscendingM,
  SortDescendingM,
} from '@synerise/ds-icon';

import { ASCENDING, DESCENDING } from '../TableColumnSorter.const';

export const DefaultSortIcon = ({
  sortDirection,
}: {
  sortDirection: SortDirection | false;
}) => {
  if (sortDirection === ASCENDING) {
    return <Icon component={<SortAscendingM />} />;
  }

  if (sortDirection === DESCENDING) {
    return <Icon component={<SortDescendingM />} />;
  }

  return <Icon component={<ArrangeM />} />;
};
