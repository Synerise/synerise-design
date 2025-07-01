import React from 'react';
import { withTheme } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import Icon, {
  ArrangeM,
  CheckS,
  SortAscendingM,
  SortAzM,
  SortDescendingM,
  SortZaM,
} from '@synerise/ds-icon';

import { type ColumnSortOrder } from './useSortState';

const CheckIconBase = ({
  isActive,
  theme,
}: { isActive: boolean } & ThemeProps): React.ReactElement | null =>
  isActive ? (
    <Icon component={<CheckS />} color={theme.palette['green-500']} />
  ) : null;

export const CheckIcon = withTheme(CheckIconBase);

const DefaultSortIconBase = ({
  sortOrder,
  theme,
}: { sortOrder: ColumnSortOrder } & ThemeProps): React.ReactElement => {
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

export const DefaultSortIcon = withTheme(DefaultSortIconBase);

const StringSortIconBase = ({
  sortOrder,
  theme,
}: { sortOrder: ColumnSortOrder } & ThemeProps): React.ReactElement => {
  if (sortOrder === 'ascend') {
    return <Icon component={<SortAzM />} color={theme.palette['gray-600']} />;
  }

  if (sortOrder === 'descend') {
    return <Icon component={<SortZaM />} color={theme.palette['gray-600']} />;
  }

  return <Icon component={<ArrangeM />} color={theme.palette['gray-600']} />;
};

export const StringSortIcon = withTheme(StringSortIconBase);
