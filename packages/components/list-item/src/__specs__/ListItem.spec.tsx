import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ListItem from '../ListItem';

describe('ListItem', () => {
  it('should render with children', () => {
    render(<ListItem>Test Item</ListItem>);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<ListItem onClick={handleClick}>Clickable Item</ListItem>);
    fireEvent.click(screen.getByText('Clickable Item'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should apply selected class on click', () => {
    const { container } = render(<ListItem>Selectable Item</ListItem>);
    fireEvent.click(screen.getByText('Selectable Item'));
    expect(container.firstChild).toHaveClass('selected');
  });

  it('should not show tooltip if disableListItemTitleTooltip is true', () => {
    render(
      <ListItem title="Tooltip Title" disableListItemTitleTooltip>
        Item
      </ListItem>
    );
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('should show tooltip if disableListItemTitleTooltip is false', () => {
    render(
      <ListItem title="Tooltip Title" disableListItemTitleTooltip={false}>
        Item
      </ListItem>
    );
    expect(screen.getByText('Tooltip Title')).toBeInTheDocument();
  });
});
