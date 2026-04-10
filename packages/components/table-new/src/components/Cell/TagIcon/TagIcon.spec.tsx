import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { TagIconCell } from './TagIcon';

describe('TagIconCell', () => {
  it('should render children', () => {
    renderWithProvider(
      <TagIconCell>
        <span>Tag content</span>
      </TagIconCell>,
    );

    expect(screen.getByText('Tag content')).toBeInTheDocument();
  });

  it('should render with disabled state', () => {
    renderWithProvider(
      <TagIconCell disabled>
        <span>Disabled tag</span>
      </TagIconCell>,
    );

    expect(screen.getByText('Disabled tag')).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    renderWithProvider(
      <TagIconCell>
        <span>Child 1</span>
        <span>Child 2</span>
      </TagIconCell>,
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
