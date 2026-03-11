import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import Cascader from '../Cascader';
import { type Category } from '../Cascader.types';

const mock: Category = {
  id: 0,
  name: 'Home',
  path: ['Home'],
  children: [
    {
      id: 1,
      name: 'Phone',
      path: ['Home', 'Phone'],
      children: [
        {
          id: 11,
          name: 'Cables',
          path: ['Home', 'Phone', 'Cables'],
        },
      ],
    },
  ],
};

describe('Cascader', () => {
  it('Should render nested categories', () => {
    const { getByText } = renderWithProvider(
      <Cascader
        categorySuffix={<div>select</div>}
        rootCategory={mock}
        selectedCategoriesIds={[]}
      />,
    );
    // ACT & ASSERT
    expect(getByText('Phone')).toBeTruthy();
  });
});
