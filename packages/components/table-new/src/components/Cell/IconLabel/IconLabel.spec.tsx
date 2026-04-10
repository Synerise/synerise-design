import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { IconLabelCell } from './IconLabel';

describe('IconLabelCell', () => {
  it('should render the label', () => {
    renderWithProvider(<IconLabelCell label="Test Label" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render with icon', () => {
    const icon = { component: <span data-testid="test-icon">icon</span> };
    renderWithProvider(<IconLabelCell label="With Icon" icon={icon} />);

    expect(screen.getByText('With Icon')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should render without label', () => {
    const icon = { component: <span data-testid="only-icon">icon</span> };
    renderWithProvider(<IconLabelCell icon={icon} />);

    expect(screen.getByTestId('only-icon')).toBeInTheDocument();
  });

  it('should render with disabled state', () => {
    const { container } = renderWithProvider(
      <IconLabelCell label="Disabled" disabled />,
    );

    expect(screen.getByText('Disabled')).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
