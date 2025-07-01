import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';

import Skeleton from '../index';

describe('Skeleton', () => {
  it('should render', function () {
    // ARRANGE
    const { container } = renderWithProvider(
      <Skeleton size="M" number={false} width="L" />,
    );
    // ASSERT
    expect(container.querySelector('.ds-skeleton')).toBeTruthy();
  });
});
