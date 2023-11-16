import * as React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import ListItem from '../ListItem';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

describe('ListItem', () => {
  it('should render with children', () => {
    renderWithProvider(<ListItem>Test Item</ListItem>);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    renderWithProvider(<ListItem onClick={handleClick}>Clickable Item</ListItem>);
    fireEvent.click(screen.getByText('Clickable Item'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should apply selected class on click', () => {
    const { container } = renderWithProvider(<ListItem>Selectable Item</ListItem>);
    fireEvent.click(screen.getByText('Selectable Item'));
    expect(container.firstChild).toHaveClass('selected');
  });

});
