import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent, screen } from '@testing-library/react';

import ListItem from '../ListItem';

describe('ListItem', () => {
  it('should render with children', () => {
    renderWithProvider(<ListItem>Test Item</ListItem>);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    renderWithProvider(
      <ListItem onClick={handleClick}>Clickable Item</ListItem>,
    );
    fireEvent.click(screen.getByText('Clickable Item'));
    expect(handleClick).toHaveBeenCalled();
  });
});
