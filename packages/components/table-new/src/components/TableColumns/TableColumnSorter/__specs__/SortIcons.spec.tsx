import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';

import { DefaultSortIcon } from '../SortIcons/DefaultSortIcon';
import { StringSortIcon } from '../SortIcons/StringSortIcon';
import { ASCENDING, DESCENDING } from '../TableColumnSorter.const';

describe.each([
  ['DefaultSortIcon', DefaultSortIcon],
  ['StringSortIcon', StringSortIcon],
])('%s', (_, SortIcon) => {
  it.each([ASCENDING, DESCENDING, false] as const)(
    'lets the %s icon take its colour from the sorter button instead of a color prop',
    (sortDirection) => {
      const { container } = renderWithProvider(
        <SortIcon sortDirection={sortDirection} />,
      );

      expect(container.querySelector('.ds-icon svg')).toHaveStyle(
        'color: inherit',
      );
    },
  );
});
