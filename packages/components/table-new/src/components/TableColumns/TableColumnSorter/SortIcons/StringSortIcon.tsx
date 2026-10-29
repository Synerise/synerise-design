import type { SortDirection } from '@tanstack/react-table';
import React from 'react';

import Icon, { ArrangeM, SortAzM, SortZaM } from '@synerise/ds-icon';

import { ASCENDING, DESCENDING } from '../TableColumnSorter.const';

export const StringSortIcon = ({
  sortDirection,
}: {
  sortDirection: SortDirection | false;
}) => {
  if (sortDirection === ASCENDING) {
    return <Icon component={<SortAzM />} />;
  }

  if (sortDirection === DESCENDING) {
    return <Icon component={<SortZaM />} />;
  }

  return <Icon component={<ArrangeM />} />;
};
