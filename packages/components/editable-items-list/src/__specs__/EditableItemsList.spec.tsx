import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent, screen } from '@testing-library/react';

import EditableItemsList from '../EditableItemsList';

describe('EditableItemsList', () => {
  const addButtonLabel = 'Add another';
  const onDeleteMock = jest.fn();
  const onAddMock = jest.fn();
  const renderRowElement = (index, item) => (
    <div data-testid={`row-${item.id}`}>Row {index + 1}</div>
  );

  it('renders all provided items', () => {
    const initialItems = [{ id: '1' }, { id: '2' }, { id: '3' }];
    renderWithProvider(
      <EditableItemsList
        renderRowElement={renderRowElement}
        items={initialItems}
        onDelete={onDeleteMock}
        onAdd={onAddMock}
        addButtonLabel={addButtonLabel}
      />,
    );
    expect(screen.getAllByTestId(/^row-/)).toHaveLength(initialItems.length);
  });

  it('calls onDelete with the correct id and index when the delete icon is clicked', () => {
    const initialItems = [{ id: '1' }, { id: '2' }, { id: '3' }];
    const idToDelete = initialItems[0].id;
    const indexToDelete = 0;

    renderWithProvider(
      <EditableItemsList
        renderRowElement={renderRowElement}
        items={initialItems}
        minRowLength={1}
        maxRowLength={10}
        addButtonLabel={addButtonLabel}
        onDelete={onDeleteMock}
        onAdd={jest.fn()}
      />,
    );

    const row = screen.getByTestId(`item-${idToDelete}`);
    expect(row).toBeInTheDocument();

    const deleteButton = row.querySelector('.remove');
    expect(deleteButton).toBeInTheDocument();

    if (deleteButton) {
      fireEvent.click(deleteButton);
      expect(onDeleteMock).toHaveBeenCalledWith(idToDelete, indexToDelete);
    }
  });

  it('calls onAdd when the add button is clicked', () => {
    const initialItems = [{ id: '1' }, { id: '2' }, { id: '3' }];

    renderWithProvider(
      <EditableItemsList
        renderRowElement={renderRowElement}
        items={initialItems}
        onDelete={onDeleteMock}
        onAdd={onAddMock}
        addButtonLabel={addButtonLabel}
      />,
    );

    const addButton = screen.getByText(addButtonLabel);
    fireEvent.click(addButton);
    expect(onAddMock).toHaveBeenCalled();
  });
});
