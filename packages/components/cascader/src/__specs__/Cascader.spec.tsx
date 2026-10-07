import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';

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

  it('puts the elevation shadow on the outer .ds-cascader element with the shadow-2 token', () => {
    const { container } = renderWithProvider(
      <Cascader
        categorySuffix={<div>select</div>}
        rootCategory={mock}
        selectedCategoriesIds={[]}
      />,
    );
    const css = Array.from(document.querySelectorAll('style'))
      .map((style) => style.textContent ?? '')
      .join('')
      .replace(/\s/g, '');
    const outer = container.querySelector('.ds-cascader') as HTMLElement;

    expect(css).toContain('box-shadow:var(--ds-shadows-shadow-2)');
    expect(css).not.toContain('rgba(35,41,54,0.05)');
    expect(
      Array.from(outer.classList).some((className) =>
        css.includes(`.${className}{box-shadow:var(--ds-shadows-shadow-2);}`),
      ),
    ).toBe(true);
  });
});
