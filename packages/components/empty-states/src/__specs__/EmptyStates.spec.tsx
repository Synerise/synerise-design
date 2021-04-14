import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import EmptyStates from '../index';

describe('EmptyStates', () => {
  it('should render', function() {
    // ARRANGE
    const { container } = renderWithProvider(
      <EmptyStates
        type='Add'
        size='L'
        labelPosition='bottom'
        label='Loading...'
      />
    );
    // ASSERT
    expect(container.querySelector('.ds-empty-states')).toBeTruthy();
  });
  it('should render label', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <EmptyStates
        type='Add'
        size='L'
        labelPosition='bottom'
        label ='No results'
      />
    );
    // ASSERT
    expect(getByText('No results')).toBeTruthy();
  })
});