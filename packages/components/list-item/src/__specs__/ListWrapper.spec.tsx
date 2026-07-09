import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import { ListWrapper } from '../components/ListWrapper/ListWrapper';

const ITEMS = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];

const renderItems = (max?: number, texts?: { showMore?: string; showLess?: string }) =>
  renderWithProvider(
    <ListWrapper maxToShowItems={max} texts={texts}>
      {ITEMS.map((label) => (
        <div key={label}>{label}</div>
      ))}
    </ListWrapper>,
  );

describe('ListWrapper — maxToShowItems', () => {
  it('renders all items when maxToShowItems is not set', () => {
    renderItems();
    ITEMS.forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
    expect(screen.queryByText('Show more')).not.toBeInTheDocument();
  });

  it('shows only the first N items when collapsed', () => {
    renderItems(3);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
    expect(screen.queryByText('Delta')).not.toBeInTheDocument();
    expect(screen.queryByText('Epsilon')).not.toBeInTheDocument();
  });

  it('shows toggle button when items exceed the limit', () => {
    renderItems(3);
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('does not show toggle button when items are within the limit', () => {
    renderItems(10);
    expect(screen.queryByText('Show more')).not.toBeInTheDocument();
  });

  it('expands to show all items when toggle is clicked', () => {
    renderItems(3);
    fireEvent.click(screen.getByText('Show more'));
    ITEMS.forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
    expect(screen.getByText('Show less')).toBeInTheDocument();
  });

  it('collapses back when toggle is clicked again', () => {
    renderItems(3);
    fireEvent.click(screen.getByText('Show more'));
    fireEvent.click(screen.getByText('Show less'));
    expect(screen.queryByText('Delta')).not.toBeInTheDocument();
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('reflects collapsed/expanded state via aria-expanded on the toggle', () => {
    renderItems(3);
    const toggle = screen.getByRole('button', { name: /show more/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: /show less/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('uses custom text labels', () => {
    renderItems(3, { showMore: 'Load more', showLess: 'Collapse' });
    expect(screen.getByText('Load more')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Load more'));
    expect(screen.getByText('Collapse')).toBeInTheDocument();
  });
});
