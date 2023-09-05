import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import Skeleton from '../index';

describe('Skeleton', () => {
  it('should render', function() {
    // ARRANGE
    const { container } = renderWithProvider(
      <Skeleton
        size='M'
        number={false}
        width='L'
      />
    );
    // ASSERT
    expect(container.querySelector('.ds-skeleton')).toBeTruthy();
  });
});