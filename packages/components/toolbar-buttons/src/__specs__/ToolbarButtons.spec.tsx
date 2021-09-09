import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import ToolbarButtons from '../../dist';

describe('Loader', () => {
  it('should render textPercent', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <ToolbarButtons
        textPercent ='100%'
      />
    );
    // ASSERT
    expect(getByText('100%')).toBeTruthy();
  })
});