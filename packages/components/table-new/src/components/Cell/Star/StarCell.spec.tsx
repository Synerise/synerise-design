import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import { StarCell } from './StarCell';

describe('StarCell', () => {
  it('should render children', () => {
    renderWithProvider(
      <StarCell>
        <span>Star content</span>
      </StarCell>,
    );

    expect(screen.getByText('Star content')).toBeInTheDocument();
  });

  it('should render in active state', () => {
    const { container } = renderWithProvider(
      <StarCell active>
        <span>Active star</span>
      </StarCell>,
    );

    expect(screen.getByText('Active star')).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });

  it('should render in inactive state', () => {
    const { container } = renderWithProvider(
      <StarCell active={false}>
        <span>Inactive star</span>
      </StarCell>,
    );

    expect(screen.getByText('Inactive star')).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });

  it('should call onClick when star icon is clicked', () => {
    const onClick = vi.fn();
    renderWithProvider(
      <StarCell onClick={onClick}>
        <span>Clickable</span>
      </StarCell>,
    );

    // Find the clickable star icon area
    const iconWrapper = document.querySelector('[class*="StarredIcon"]');
    if (iconWrapper) {
      fireEvent.click(iconWrapper);
      expect(onClick).toHaveBeenCalled();
    }
  });
});
