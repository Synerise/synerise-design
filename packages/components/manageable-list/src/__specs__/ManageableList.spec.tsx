import React from 'react';
import { IntlProvider } from 'react-intl';
import { fireEvent, screen } from '@testing-library/react';

import { FileM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-core';

import ManageableList from '../ManageableList';

const DEFAULT_ITEMS = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Default',
    canUpdate: false,
    canDelete: false,
    icon: <FileM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Basic',
    canUpdate: true,
    canDelete: true,
    icon: <FileM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'My folder',
    canUpdate: true,
    canDelete: true,
    icon: <FileM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'My folder 2',
    canUpdate: true,
    canDelete: true,
    icon: <FileM />,
  },
];

const ITEMS = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Default',
    canUpdate: false,
    canDelete: false,
    icon: <FileM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Basic',
    canUpdate: true,
    canDelete: true,
    icon: <FileM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'My folder',
    canUpdate: true,
    canDelete: true,
    icon: <FileM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'My folder 2',
    canUpdate: true,
    canDelete: true,
    icon: <FileM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'My folder 3',
    canUpdate: true,
    canDelete: true,
    icon: <FileM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'My folder 4',
    canUpdate: true,
    canDelete: true,
    icon: <FileM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    name: 'My folder 5',
    canUpdate: true,
    canDelete: true,
    icon: <FileM />,
  },
];

const texts = {
  addItemLabel: 'Add folder',
  showMoreLabel: 'Show all',
  showLessLabel: 'Show less',
  more: 'more',
  less: 'less',
  activateItemTitle:
    'By activating this filter, you will cancel your unsaved filter settings',
  activate: 'Activate',
  cancel: 'Cancel',
  deleteConfirmationTitle: 'Delete filter',
  deleteConfirmationDescription:
    'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.',
  deleteLabel: 'Delete',
};

describe('ManageableList', () => {
  it('should render with no items', () => {
    renderWithProvider(
      <ManageableList
        items={[]}
        loading={false}
        visibleItemsLimit={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        type="default"
        texts={texts}
      />,
    );

    expect(screen.getByTestId('add-item-with-name-button')).toBeTruthy();
    expect(screen.queryByTestId('show-more-button')).toBeNull();
    expect(screen.queryByTestId('list-item-name')).toBeNull();
  });

  it('should render with 4 items', () => {
    renderWithProvider(
      <ManageableList
        items={DEFAULT_ITEMS}
        loading={false}
        visibleItemsLimit={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        type="default"
        texts={texts}
      />,
    );

    expect(screen.getByTestId('add-item-with-name-button')).toBeTruthy();
    expect(screen.queryByTestId('show-more-button')).toBeNull();
    expect(screen.queryAllByTestId('list-item-name').length).toBe(4);
    expect(screen.queryAllByTestId('list-item-edit').length).toBe(3);
    expect(screen.queryAllByTestId('list-item-remove').length).toBe(3);
  });

  it('should render with hidden items and show-more button', () => {
    renderWithProvider(
      <ManageableList
        items={ITEMS}
        loading={false}
        visibleItemsLimit={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        type="default"
        texts={texts}
      />,
    );
    const showMore = screen.getByTestId('show-more-button');

    expect(screen.getByTestId('add-item-with-name-button')).toBeTruthy();
    expect(showMore).toBeTruthy();
    expect(screen.queryAllByTestId('list-item-name').length).toBe(5);
    expect(showMore.textContent).toBe('+ 2 more Show all');
  });

  it('should show all items after show more button clicked', () => {
    renderWithProvider(
      <ManageableList
        items={ITEMS}
        loading={false}
        visibleItemsLimit={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        type="default"
        texts={texts}
      />,
    );
    const showMore = screen.getByTestId('show-more-button');

    expect(showMore.textContent).toBe('+ 2 more Show all');
    expect(screen.queryAllByTestId('list-item-name').length).toBe(5);
    fireEvent.click(showMore);
    expect(showMore.textContent).toBe('- 2 less Show less');
    expect(screen.queryAllByTestId('list-item-name').length).toBe(7);
  });

  it('should fire onItemSelect method on item click', () => {
    const onItemSelect = jest.fn();
    renderWithProvider(
      <ManageableList
        items={ITEMS}
        loading={false}
        visibleItemsLimit={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={onItemSelect}
        onItemRemove={() => { }}
        type="default"
        texts={texts}
      />,
    );

    //ACT
    const firstListItem = screen.queryAllByTestId('list-item-name')[0];
    fireEvent.click(firstListItem);

    expect(onItemSelect).toHaveBeenCalledWith({ id: '00000000-0000-0000-0000-000000000000' });
  });

  it('should fire remove item', () => {
    const onItemRemove = jest.fn();
    renderWithProvider(
      <ManageableList
        items={ITEMS}
        loading={false}
        visibleItemsLimit={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={onItemRemove}
        type="default"
        texts={texts}
      />,
    );
    const firstRemoveButton = screen.queryAllByTestId('list-item-remove')[0];
    const removeItemIcon = firstRemoveButton.querySelector('svg');
    expect(removeItemIcon).toBeTruthy();
    if (removeItemIcon) {
      fireEvent.click(removeItemIcon);
    }
    expect(onItemRemove).toHaveBeenCalled();
  });

  it('should fire onItemAdd', () => {
    const onItemAdd = jest.fn();
    renderWithProvider(
      <ManageableList
        items={DEFAULT_ITEMS}
        loading={false}
        visibleItemsLimit={5}
        onItemAdd={onItemAdd}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        type="default"
        texts={texts}
      />,
    );
    const NEW_FOLDER_NAME = 'New folder';
    const addItemButton = screen.getByTestId('add-item-with-name-button').getElementsByTagName('button')[0];

    expect(addItemButton).toBeTruthy();
    // SHOW ADD ITEM INPUT
    fireEvent.click(addItemButton);
    const addItemInput = screen.getByTestId('add-item-input');
    expect(addItemInput).toBeTruthy();
    // SET ADD ITEM INPUT VALUE
    fireEvent.change(addItemInput, { target: { value: NEW_FOLDER_NAME } });
    expect((addItemInput as HTMLInputElement).value).toBe(NEW_FOLDER_NAME);
    // SUBMIT NEW ITEM
    fireEvent.keyDown(addItemInput, { key: 'Enter', keyCode: 13 });
    expect(onItemAdd).toHaveBeenCalledWith({ name: NEW_FOLDER_NAME });
  });

  it('should show "show more" without texts props', () => {
    renderWithProvider(
      <IntlProvider
        locale="en"
        messages={{
          'DS.MANAGABLE-LIST.MORE': 'more',
          'DS.MANAGABLE-LIST.LESS': 'less',
          'DS.MANAGABLE-LIST.SHOW-MORE': 'show more',
          'DS.MANAGABLE-LIST.SHOW-LESS': 'show less',
        }}
      >
        <ManageableList
          items={ITEMS}
          loading={false}
          visibleItemsLimit={5}
          onItemAdd={() => { }}
          onItemEdit={() => { }}
          onItemSelect={() => { }}
          onItemRemove={() => { }}
          type="default"
          texts={{}}
        />
      </IntlProvider>,
    );
    const showMore = screen.getByTestId('show-more-button');

    expect(showMore.textContent).toBe('+ 2 more show more');
    expect(screen.queryAllByTestId('list-item-name').length).toBe(5);
    fireEvent.click(showMore);
    expect(showMore.textContent).toBe('- 2 less show less');
    expect(screen.queryAllByTestId('list-item-name').length).toBe(7);
  });
});
