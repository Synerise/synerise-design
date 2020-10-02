import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Loader from '../index';

describe('Loader', () => {
  it('should render', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Loader
        size='L'
        elementsPosition='right'
        textLoader='Loading...'
      />
    );
    // ASSERT
    expect(getByText('size')).toBeTruthy();
  });
  it('should render label', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Loader
        size='L'
        elementsPosition='right'
        textLoader='Loading...'
      />
    );
    // ASSERT
    expect(getByText('textLoader')).toBeTruthy();
  });