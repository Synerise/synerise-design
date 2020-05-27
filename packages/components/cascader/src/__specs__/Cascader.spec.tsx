import { Category } from '../Cascader.types';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Cascader from '../Cascader';
import * as React from 'react';
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
      <Cascader categorySuffix={<div>select</div>} rootCategory={mock as Category} selectedCategoriesIds={[]} />
    );
    // ACT & ASSERT
    expect(getByText('Phone')).toBeTruthy();
  });
});
