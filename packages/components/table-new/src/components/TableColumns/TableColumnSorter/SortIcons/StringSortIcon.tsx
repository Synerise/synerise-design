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
    return (
      <Icon component={<SortAzM />} color="var(--ds-color-icon-base-default)" />
    );
  }

  if (sortDirection === DESCENDING) {
    return (
      <Icon component={<SortZaM />} color="var(--ds-color-icon-base-default)" />
    );
  }

  return (
    <Icon component={<ArrangeM />} color="var(--ds-color-icon-base-default)" />
  );
};
