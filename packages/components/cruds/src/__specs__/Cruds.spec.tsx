import React from 'react';

import { Settings2S } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';

import Cruds from '../Cruds';

const ICON = {
  add: '.add-s',
  edit: '.edit-s',
  duplicate: '.duplicate-s',
  delete: '.trash-s',
  move: '.drag-handle-m',
  remove: '.close-s',
  settings: '.settings-2-s',
};

describe('Cruds', () => {
  it('Should render with multiple icons', () => {
    // ARRANGE
    const handleAdd = jest.fn();
    const handleDelete = jest.fn();
    const handleDuplicate = jest.fn();
    const handleEdit = jest.fn();
    const handleMove = jest.fn();
    const handleRemove = jest.fn();

    const { container } = renderWithProvider(
      <Cruds
        onAdd={handleAdd}
        onDelete={handleDelete}
        onRemove={handleRemove}
        onMove={handleMove}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        addTooltip={'Add'}
        deleteTooltip={'Delete'}
        duplicateTooltip={'Duplicate'}
        editTooltip={'Edit'}
        moveTooltip={'Move'}
        removeTooltip={'Remove'}
      />,
    );

    // ASSERT
    expect(container.querySelector(ICON.add)).toBeTruthy();
    expect(container.querySelector(ICON.edit)).toBeTruthy();
    expect(container.querySelector(ICON.duplicate)).toBeTruthy();
    expect(container.querySelector(ICON.delete)).toBeTruthy();
    expect(container.querySelector(ICON.move)).toBeTruthy();
    expect(container.querySelector(ICON.remove)).toBeTruthy();
  });

  it('Should handle actions', () => {
    // ARRANGE
    const handleAdd = jest.fn();
    const handleDelete = jest.fn();
    const handleDuplicate = jest.fn();
    const handleEdit = jest.fn();
    const handleMove = jest.fn();
    const handleRemove = jest.fn();

    const { container } = renderWithProvider(
      <Cruds
        onAdd={handleAdd}
        onDelete={handleDelete}
        onRemove={handleRemove}
        onMove={handleMove}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        addTooltip={'Add'}
        deleteTooltip={'Delete'}
        duplicateTooltip={'Duplicate'}
        editTooltip={'Edit'}
        moveTooltip={'Move'}
        removeTooltip={'Remove'}
      />,
    );

    // ACT
    const addIcon = container.querySelector(ICON.add) as HTMLElement;
    const editIcon = container.querySelector(ICON.edit) as HTMLElement;
    const duplicateIcon = container.querySelector(
      ICON.duplicate,
    ) as HTMLElement;
    const deleteIcon = container.querySelector(ICON.delete) as HTMLElement;
    const moveIcon = container.querySelector(ICON.move) as HTMLElement;
    const removeIcon = container.querySelector(ICON.remove) as HTMLElement;

    fireEvent.click(addIcon);
    fireEvent.click(editIcon);
    fireEvent.click(duplicateIcon);
    fireEvent.click(deleteIcon);
    fireEvent.click(moveIcon);
    fireEvent.click(removeIcon);

    // ASSERT
    expect(handleAdd).toBeCalled();
    expect(handleDuplicate).toBeCalled();
    expect(handleDelete).toBeCalled();
    expect(handleEdit).toBeCalled();
    expect(handleMove).toBeCalled();
    expect(handleRemove).toBeCalled();
  });

  it('Should render customAction', () => {
    // ARRANGE
    const handleClick = jest.fn();

    const { container } = renderWithProvider(
      <Cruds.CustomAction
        className="settings"
        title={'Settings'}
        icon={<Settings2S />}
        onClick={handleClick}
      />,
    );

    // ACT
    const settingsIcon = container.querySelector(ICON.settings) as HTMLElement;
    fireEvent.click(settingsIcon);

    // ASSERT
    expect(settingsIcon).toBeTruthy();
    expect(handleClick).toBeCalled();
  });
});
