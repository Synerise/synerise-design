import React from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { ArrangeM, SortAzM, SortZaM } from '@synerise/ds-icon';
import { type SortDirection } from '@tanstack/react-table';

import { ASCENDING, DESCENDING } from '../TableColumnSorter.const';

export const StringSortIcon = ({
  sortDirection,
}: {
  sortDirection: SortDirection | false;
}) => {
  const theme = useTheme();
  if (sortDirection === ASCENDING) {
    return <Icon component={<SortAzM />} color={theme.palette['gray-600']} />;
  }

  if (sortDirection === DESCENDING) {
    return <Icon component={<SortZaM />} color={theme.palette['gray-600']} />;
  }

  return <Icon component={<ArrangeM />} color={theme.palette['gray-600']} />;
};
