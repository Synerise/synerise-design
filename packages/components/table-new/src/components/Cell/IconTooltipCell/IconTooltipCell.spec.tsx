import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { IconTooltipCell } from './IconTooltipCell';

describe('IconTooltipCell', () => {
  it('should render label', () => {
    renderWithProvider(<IconTooltipCell label="Tooltip Label" />);

    expect(screen.getByText('Tooltip Label')).toBeInTheDocument();
  });

  it('should render with icon', () => {
    const icon = { component: <span data-testid="main-icon">icon</span> };
    renderWithProvider(<IconTooltipCell label="With Icon" icon={icon} />);

    expect(screen.getByText('With Icon')).toBeInTheDocument();
    expect(screen.getByTestId('main-icon')).toBeInTheDocument();
  });

  it('should render tooltip icon', () => {
    const tooltipIcon = {
      component: <span data-testid="tooltip-icon">info</span>,
    };
    renderWithProvider(
      <IconTooltipCell
        label="Info"
        tooltipIcon={tooltipIcon}
        tooltip={{ title: 'More info' }}
      />,
    );

    expect(screen.getByTestId('tooltip-icon')).toBeInTheDocument();
  });

  it('should render with disabled state', () => {
    const { container } = renderWithProvider(
      <IconTooltipCell label="Disabled" disabled />,
    );

    expect(screen.getByText('Disabled')).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
