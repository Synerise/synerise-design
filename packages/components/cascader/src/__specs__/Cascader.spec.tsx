import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';

import Cascader from '../Cascader';
import { type Category } from '../Cascader.types';

const mock = {
  id: 0,
  name: 'Home',
  path: ['Home'],
  phone: {
    path: ['Home', 'Phone'],
    id: 1,
    name: 'Phone',
    Cables: {
      path: ['Home', 'Phone', 'Cables'],
      name: 'Cables',
      id: 11,
    },
  },
};
describe('Cascader', () => {
  it('Should render nested categories', () => {
    const { getByText } = renderWithProvider(
      <Cascader
        categorySuffix={<div>select</div>}
        rootCategory={mock as Category}
        selectedCategoriesIds={[]}
      />,
    );
    // ACT & ASSERT
    expect(getByText('Phone')).toBeTruthy();
  });
});
