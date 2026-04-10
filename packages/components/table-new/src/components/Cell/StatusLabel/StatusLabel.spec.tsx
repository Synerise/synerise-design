import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { StatusLabelCell } from './StatusLabel';

describe('StatusLabelCell', () => {
  it('should render the label', () => {
    renderWithProvider(<StatusLabelCell label="Active" />);

    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should render with status', () => {
    renderWithProvider(<StatusLabelCell label="Success" status="success" />);

    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('should render with custom color', () => {
    renderWithProvider(
      <StatusLabelCell label="Custom" customColor="green" />,
    );

    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('should render with disabled state', () => {
    const { container } = renderWithProvider(
      <StatusLabelCell label="Disabled" disabled />,
    );

    expect(screen.getByText('Disabled')).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
