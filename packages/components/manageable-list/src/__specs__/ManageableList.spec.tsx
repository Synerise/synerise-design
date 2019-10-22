import * as React from 'react';
import ManageableList from '../Manageable-list';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';

const DEFAULT_ITEMS:any = [
  {
    catalogId: "00000000-0000-0000-0000-000000000000",
    name: "Default",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: false,
    canDeleteCatalog: false,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000001",
    name: "Basic",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000002",
    name: "My folder",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000003",
    name: "My folder 2",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
]

const ITEMS:any = [
  {
    catalogId: "00000000-0000-0000-0000-000000000000",
    name: "Default",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: false,
    canDeleteCatalog: false,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000001",
    name: "Basic",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000002",
    name: "My folder",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000003",
    name: "My folder 2",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000004",
    name: "My folder 3",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000005",
    name: "My folder 4",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000006",
    name: "My folder 5",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  }
]

describe('ManageableList', () => {
  it('should render with no items', () => {
    const { queryByTestId, getByTestId } = renderWithProvider(
      <ManageableList
        items={[]}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
      />);
      expect(getByTestId('add-item-button')).toBeTruthy();
      expect(queryByTestId('show-more-button')).toBeNull();
      expect(queryByTestId('list-item-name')).toBeNull();
  });

  it('should render with 4 items', () => {
    const { queryByTestId, queryAllByTestId, getByTestId } = renderWithProvider(
      <ManageableList
        items={DEFAULT_ITEMS}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
      />);
    expect(getByTestId('add-item-button')).toBeTruthy();
    expect(queryByTestId('show-more-button')).toBeNull();
    expect(queryAllByTestId('list-item-name').length).toBe(4);
    expect(queryAllByTestId('list-item-edit').length).toBe(3);
    expect(queryAllByTestId('list-item-remove').length).toBe(3);
  });

  it('should render with hidden items and show-more button', () => {
    const { queryByTestId, queryAllByTestId, getByTestId } = renderWithProvider(
      <ManageableList
        items={ITEMS}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
      />);
    const showMore = getByTestId('show-more-button');
    expect(getByTestId('add-item-button')).toBeTruthy();
    expect(showMore).toBeTruthy();
    expect(queryAllByTestId('list-item-name').length).toBe(5);
    expect(showMore.textContent).toBe('+ 2 more Show all');
  });

  it('should show all items after show more button clicked', () => {
    const { queryByTestId, queryAllByTestId, getByTestId } = renderWithProvider(
      <ManageableList
        items={ITEMS}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
      />);
    const showMore = getByTestId('show-more-button');
    expect(showMore.textContent).toBe('+ 2 more Show all');
    expect(queryAllByTestId('list-item-name').length).toBe(5);
    fireEvent.click(showMore);
    expect(showMore.textContent).toBe('- 2 less Show less');
    expect(queryAllByTestId('list-item-name').length).toBe(7);
  });

  it('should fire onItemSelect method on item click', () => {
    const onItemSelect = jest.fn();
    const { getByTestId, queryAllByTestId } = renderWithProvider(
      <ManageableList
        items={ITEMS}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={onItemSelect}
        onItemRemove={() => {}}
      />);
    const firstListItem = queryAllByTestId('list-item-name')[0];
    fireEvent.click(firstListItem);
    expect(onItemSelect).toHaveBeenCalledWith({id: '00000000-0000-0000-0000-000000000000'});
  });

  it('should fire remove item', () => {
    const onItemRemove = jest.fn();
    const { getByTestId, queryAllByTestId } = renderWithProvider(
      <ManageableList
        items={ITEMS}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={onItemRemove}
      />);
    const firstRemoveButton = queryAllByTestId('list-item-remove')[0];
    fireEvent.click(firstRemoveButton.querySelector('svg'));
    expect(onItemRemove).toHaveBeenCalled();
  });

  it('should fire onItemAdd', () => {
    const onItemAdd = jest.fn();
    const { getByTestId, queryAllByTestId } = renderWithProvider(
      <ManageableList
        items={DEFAULT_ITEMS}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={onItemAdd}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
      />);
    const NEW_FOLDER_NAME = 'New folder';
    const addItemButton = getByTestId('add-item-button');
    expect(addItemButton).toBeTruthy();
    // SHOW ADD ITEM INPUT
    fireEvent.click(addItemButton);
    const addItemInput = getByTestId('add-item-input');
    expect(addItemInput).toBeTruthy();
    // SET ADD ITEM INPUT VALUE
    fireEvent.change(addItemInput, {target: {value: NEW_FOLDER_NAME}});
    expect((addItemInput as HTMLInputElement).value).toBe(NEW_FOLDER_NAME);
    // SUBMIT NEW ITEM
    fireEvent.keyDown(addItemInput, {key: 'Enter', keyCode: 13});
    expect(onItemAdd).toHaveBeenCalledWith({name: NEW_FOLDER_NAME});
  });

});