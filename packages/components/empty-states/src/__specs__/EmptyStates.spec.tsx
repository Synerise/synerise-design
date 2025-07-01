import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { screen } from '@testing-library/react';

import EmptyStates from '../index';

describe('EmptyStates', () => {
  it('should render label', function () {
    renderWithProvider(
      <EmptyStates labelPosition="bottom" label="No results" />,
    );
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('should render icon', function () {
    renderWithProvider(
      <EmptyStates
        labelPosition="bottom"
        label="No results"
        customIcon={<>ICON</>}
      />,
    );
    expect(screen.getByTestId('empty-states-custom-icon')).toBeInTheDocument();
  });

  it('should render without icon', function () {
    renderWithProvider(
      <EmptyStates labelPosition="bottom" label="No results" />,
    );
    expect(
      screen.queryByTestId('empty-states-custom-icon'),
    ).not.toBeInTheDocument();
  });
});
