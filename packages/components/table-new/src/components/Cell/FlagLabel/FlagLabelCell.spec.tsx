import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { FlagLabelCell } from './FlagLabelCell';

describe('FlagLabelCell', () => {
  it('should render the label', () => {
    renderWithProvider(<FlagLabelCell countryCode="US" label="United States" />);

    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  it('should render with different country codes', () => {
    renderWithProvider(<FlagLabelCell countryCode="PL" label="Poland" />);

    expect(screen.getByText('Poland')).toBeInTheDocument();
  });
});
