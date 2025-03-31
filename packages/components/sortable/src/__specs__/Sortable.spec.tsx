import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Sortable from '../index';

const ITEMS: ItemProps[] = [
  {
    id: '1',
    text: 'test',
  },
  {
    id: '2',
    text: 'test',
  },
];
type ItemProps = { id: string; text: string; dragHandleProps?: any };

const ItemComponent = (props: ItemProps) => {
  return (
    <div data-testid="sortable-item" {...props.dragHandleProps}>
      {props.text}
    </div>
  );
};


describe('Sortable', () => {
  it('should render', () => {
    const handleChange = jest.fn();
    renderWithProvider(<Sortable onOrderChange={handleChange} items={ITEMS} ItemComponent={ItemComponent} />);

    expect(screen.getAllByTestId('sortable-item')).toHaveLength(ITEMS.length);
  });
});
