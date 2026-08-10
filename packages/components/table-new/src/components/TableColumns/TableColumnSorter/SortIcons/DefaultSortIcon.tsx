import React from 'react';

import Icon, {
  ArrangeM,
  SortAscendingM,
  SortDescendingM,
} from '@synerise/ds-icon';
import { type SortDirection } from '@tanstack/react-table';

import { ASCENDING, DESCENDING } from '../TableColumnSorter.const';

export const DefaultSortIcon = ({
  sortDirection,
}: {
  sortDirection: SortDirection | false;
}) => {
  if (sortDirection === ASCENDING) {
    return (
      <Icon
        component={<SortAscendingM />}
        color="var(--ds-color-icon-base-default)"
      />
    );
  }

  if (sortDirection === DESCENDING) {
    return (
      <Icon
        component={<SortDescendingM />}
        color="var(--ds-color-icon-base-default)"
      />
    );
  }

  return (
    <Icon component={<ArrangeM />} color="var(--ds-color-icon-base-default)" />
  );
};
