import React from 'react';

import { useTheme } from '@synerise/ds-core';
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
  const theme = useTheme();
  if (sortDirection === ASCENDING) {
    return (
      <Icon component={<SortAscendingM />} color={theme.palette['gray-600']} />
    );
  }

  if (sortDirection === DESCENDING) {
    return (
      <Icon component={<SortDescendingM />} color={theme.palette['gray-600']} />
    );
  }

  return <Icon component={<ArrangeM />} color={theme.palette['gray-600']} />;
};
