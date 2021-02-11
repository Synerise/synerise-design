import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

import * as React from 'react';
import OrderedList from '../../dist/OrderedList';
import { OrderedListProps } from '../../dist/Ordered-list';

  describe('Ordered-list with nested items', () => {
    const data = [
      { text: 'Option 1' },
      { text: 'Option 2' },
      { text: 'Option 3', subMenu: [{ text: 'Child 1' }] },
      { text: 'Option 4', subMenu: [{ text: 'Child 1' }] },
    ] as OrderedListProps[];

    it('should render basic menu list', () => {
      // ARRANGE
      const { getByText } = renderWithProvider(<OrderedList data={data} />);

      // ASSERT
      expect(getByText('Option 1')).toBeTruthy();
      expect(getByText('Option 2')).toBeTruthy();
    });
  });
