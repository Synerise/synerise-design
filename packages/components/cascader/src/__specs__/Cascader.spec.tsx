import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Cascader from './../Cascader';
import { Category } from 'Cascader.types';

const mock = {
  id: 0,
  name: 'Home',
  path: ['Home'],
  phone: {
    path: ['Phone'],
    id: 1,
    name: 'Phone',
    Cables: {
      path: ['Phone', 'Cables'],
      name: 'Cables',
      id: 11,
    },
  },
};
describe('Cascader', () => {
  it('should render nested category', async () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Cascader
        categorySuffix={<div>select</div>}
        rootCategory={mock as Category}
        selectedCategoriesIds={[]}
      />
    );
    // ACT & ASSERT
    expect(getByText('Phone')).toBeTruthy();
  });
});
