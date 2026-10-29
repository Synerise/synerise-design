import React from 'react';

import { Settings2S } from '@synerise/ds-icon';
import { renderWithProvider, rulesFor } from '@synerise/ds-core/testing';
import { fireEvent, screen } from '@testing-library/react';

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
    const handleAdd = vi.fn();
    const handleDelete = vi.fn();
    const handleDuplicate = vi.fn();
    const handleEdit = vi.fn();
    const handleMove = vi.fn();
    const handleRemove = vi.fn();

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
    const handleAdd = vi.fn();
    const handleDelete = vi.fn();
    const handleDuplicate = vi.fn();
    const handleEdit = vi.fn();
    const handleMove = vi.fn();
    const handleRemove = vi.fn();

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
    const handleClick = vi.fn();

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

describe('Cruds icon colour', () => {
  const renderAll = () =>
    renderWithProvider(
      <Cruds
        onAdd={vi.fn()}
        onEdit={vi.fn()}
        onPreview={vi.fn()}
        onDuplicate={vi.fn()}
        onDelete={vi.fn()}
        onRemove={vi.fn()}
        onMoveUp={vi.fn()}
        moveUpInactive
      />,
    );

  it('sets the idle and danger colours on the action wrapper, not the svg', () => {
    renderAll();

    ['add', 'edit', 'preview', 'duplicate'].forEach((action) => {
      expect(screen.getByTestId(`ds-cruds-${action}`)).toHaveStyle(
        'color: var(--ds-cruds-default-idle)',
      );
    });
    ['delete', 'remove'].forEach((action) => {
      expect(screen.getByTestId(`ds-cruds-${action}`)).toHaveStyle(
        'color: var(--ds-cruds-danger-idle)',
      );
    });
    expect(screen.getByTestId('ds-cruds-moveup')).toHaveStyle(
      'color: var(--ds-cruds-default-disabled)',
    );
    screen.getAllByTestId(/^ds-cruds-/).forEach((wrapper) => {
      expect(
        wrapper.querySelector('.ds-icon')?.querySelector('svg'),
      ).toHaveStyle('color: inherit');
    });
  });

  it('turns the hover colour on via the wrapper and never forces svg fill', () => {
    renderAll();

    const edit = screen.getByTestId('ds-cruds-edit');
    const cruds = edit.closest('.ds-cruds');
    const hoverRule = rulesFor(edit, { within: cruds, state: ':hover' }).find(
      ({ selector }) => selector.includes('.edit:hover'),
    );
    // Every state's rules the container emits for itself and for anything inside it.
    const crudsRules = [
      ...rulesFor(cruds, { state: 'any' }),
      ...Array.from(cruds?.querySelectorAll('*') ?? []).flatMap((element) =>
        rulesFor(element, { within: cruds, state: 'any' }),
      ),
    ];

    expect(hoverRule?.declarations).toContain(
      'color:var(--ds-cruds-default-hover)',
    );
    expect(crudsRules.some(({ selector }) => /svg/.test(selector))).toBe(false);
    expect(
      crudsRules.map(({ declarations }) => declarations).join(';'),
    ).not.toMatch(/(^|;)fill:/);
  });
});
