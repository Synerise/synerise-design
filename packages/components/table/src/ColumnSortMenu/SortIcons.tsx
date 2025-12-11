import React from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, {
  ArrangeM,
  SortAscendingM,
  SortAzM,
  SortDescendingM,
  SortZaM,
} from '@synerise/ds-icon';

import { type ColumnSortOrder } from '../Table.types';

export const DefaultSortIcon = ({
  sortOrder,
}: {
  sortOrder: ColumnSortOrder;
}) => {
  const theme = useTheme();
  if (sortOrder === 'ascend') {
    return (
      <Icon component={<SortAscendingM />} color={theme.palette['gray-600']} />
    );
  }

  if (sortOrder === 'descend') {
    return (
      <Icon component={<SortDescendingM />} color={theme.palette['gray-600']} />
    );
  }

  return <Icon component={<ArrangeM />} color={theme.palette['gray-600']} />;
};

export const StringSortIcon = ({
  sortOrder,
}: {
  sortOrder: ColumnSortOrder;
}) => {
  const theme = useTheme();
  if (sortOrder === 'ascend') {
    return <Icon component={<SortAzM />} color={theme.palette['gray-600']} />;
  }

  if (sortOrder === 'descend') {
    return <Icon component={<SortZaM />} color={theme.palette['gray-600']} />;
  }

  return <Icon component={<ArrangeM />} color={theme.palette['gray-600']} />;
};
