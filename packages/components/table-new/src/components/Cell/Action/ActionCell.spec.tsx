import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { ActionCell } from './ActionCell';

describe('ActionCell', () => {
  it('should render children', () => {
    renderWithProvider(
      <ActionCell>
        <button>Edit</button>
        <button>Delete</button>
      </ActionCell>,
    );

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should render with custom contentAlign', () => {
    const { container } = renderWithProvider(
      <ActionCell contentAlign="left">
        <button>Action</button>
      </ActionCell>,
    );

    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });

  it('should render with custom gapSize', () => {
    renderWithProvider(
      <ActionCell gapSize={8}>
        <span>Item 1</span>
        <span>Item 2</span>
      </ActionCell>,
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
