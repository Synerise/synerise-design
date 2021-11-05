import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import FieldSet from '../index';

describe('Field-Set', () => {
  it('should render', function() {
    // ARRANGE
    const { container } = renderWithProvider(
      <FieldSet
        title='Advanced option'
        description = 'This section is for avanced users only'
      />
    );
    // ASSERT
    expect(container.querySelector('.ds-field-set')).toBeTruthy();
  });
  it('should render title', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FieldSet
        title='Advanced option'
        description = 'This section is for avanced users only'
      />
    );
    // ASSERT
    expect(getByText('Advanced option')).toBeTruthy();
  })
});