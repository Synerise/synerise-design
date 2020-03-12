import * as React from 'react';
import ColumnManager, { ViewMeta } from '../ColumnManager';
import { Column } from '../ColumnManagerItem/ColumnManagerItem';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent, wait } from '@testing-library/react';

interface View {
  meta: ViewMeta;
  columns: Column[];
}

const ITEM_FILTER_TEXTS = {
  activateItemTitle: 'By activating this filter, you will cancel your unsaved filter settings',
  activate: 'Activate',
  cancel: 'Cancel',
  deleteConfirmationTitle: 'Detele filter',
  deleteConfirmationDescription: 'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.',
  deleteLabel: 'Delete',
  noResults: 'No results',
  searchPlaceholder: 'Search',
  searchClearTooltip: 'Clear',
  title: 'Item filter',
};
const TEXTS = {
  title: 'Manage columns',
  searchPlaceholder: 'Search',
  searchResults: 'Results',
  noResults: 'No results',
  visible: 'Visible',
  hidden: 'Hidden',
  saveView: 'Save view',
  cancel: 'Cancel',
  apply: 'Apply',
  fixedLeft: 'Fixed left',
  fixedRight: 'Fixed right',
  clear: 'Clear',
  viewName: 'View name',
  viewDescription: 'Description',
  viewNamePlaceholder: 'Name',
  viewDescriptionPlaceholder: 'Description',
  mustNotBeEmpty: 'Must not be empty',
  searchClearTooltip: 'Clear',
};

const COLUMNS = [
  {
    id: '0',
    name: 'User name',
    visible: true,
    type: 'text',
    fixed: 'left',
  },
  {
    id: '1',
    name: 'City',
    visible: true,
    type: 'text',
    fixed: undefined,
  },
  {
    id: '2',
    name: 'Language',
    visible: false,
    type: 'text',
    fixed: undefined,
  },
  {
    id: '3',
    name: 'Clients numbers',
    visible: false,
    type: 'number',
    fixed: undefined,
  },
];

const FILTERS = [
  {
    id: '0000',
    name: 'Filter #1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
    created: '01-05-2020 12:02',
    canUpdate: true,
    canDelete: true,
    canDuplicate: true,
    categories: ['My filters', 'All filters'],
    user: {
      firstname: 'Jan',
      lastname: 'Nowak',
    },
    columns: COLUMNS,
  },
  {
    id: '0001',
    name: 'Filter #2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
    created: '01-12-2019 12:02',
    canUpdate: false,
    canDelete: false,
    canDuplicate: true,
    categories: ['All filters'],
    user: {
      firstname: 'Kamil',
      lastname: 'Kowalski',
    },
    columns: COLUMNS,
  },
];

const CATEGORIES = [{label: 'All filters'}, {label: 'My filters'}];

const COLUMN_MANAGER = (visible: boolean = true, hide: () => void = () => {}, onSave: (currentView: View) => void = () => {}, onApply = () => {}, selectedFilter = '') => (
  <ColumnManager
    hide={hide}
    visible={visible}
    columns={COLUMNS}
    onSave={onSave}
    onApply={onApply}
    texts={TEXTS}
    itemFilterConfig={{
      removeItem: (params: {id: string}) => {},
      editItem: (params: {id: string, name: string}) => {},
      selectItem: (params: {id: string}) => {},
      duplicateItem: (params: {id: string}) => {},
      selectedItemId: selectedFilter,
      categories: CATEGORIES,
      items: FILTERS,
      texts: ITEM_FILTER_TEXTS,
    }}
  />
);


describe('ColumnManager', () => {
  it('should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(COLUMN_MANAGER(true, () => {}, () => {}, () => {}, ''));

    //ASSERT
    expect(getByText('Manage columns')).toBeTruthy();
    expect(getByText('Visible')).toBeTruthy();
    expect(getByText('Hidden')).toBeTruthy();
    expect(getByText('Save view')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Apply')).toBeTruthy();
  });

  it('should close himself when close or cancel button has been clicked', () => {
    // ARRANGE
    const hide = jest.fn();
    const { getByTestId } = renderWithProvider(COLUMN_MANAGER(true, hide, () => {}, () => {}, '' ));

    // ACT
    fireEvent.click(getByTestId('ds-column-manager-close'));
    fireEvent.click(getByTestId('ds-column-manager-cancel'));

    // ASSERT
    expect(hide).toBeCalledTimes(2);
  });

  it('should close call onApply function with current columns configuration', () => {
    // ARRANGE
    const hide = jest.fn();
    const apply = jest.fn();
    const { getByTestId } = renderWithProvider(COLUMN_MANAGER(true, hide, () => {}, apply, '' ));

    // ACT
    fireEvent.click(getByTestId('ds-column-manager-apply'));

    // ASSERT
    expect(apply).toBeCalledWith(COLUMNS);
  });

  it('should save new filter', async () => {
    // ARRANGE
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    const { getByTestId, getByPlaceholderText, getByText } = renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, '' ));

    // ACT
    fireEvent.click(getByText('Save view'));
    await wait();

    // ARRANGE
    const nameInput = getByPlaceholderText('Name');
    const modalApply = getByTestId('ds-modal-apply');

    // ACT
    fireEvent.change(nameInput, {target: {value: 'Test name'}});
    fireEvent.click(modalApply);

    // ASSERT
    expect(save).toBeCalledWith({meta: {name: 'Test name', description: '' }, columns: COLUMNS});
  });

  it('should show validation error on new filter modal', async () => {
    // ARRANGE
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    const { getByTestId, getByText } = renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, '' ));

    // ACT
    fireEvent.click(getByText('Save view'));
    await wait();

    // ARRANGE
    const modalApply = getByTestId('ds-modal-apply');

    // ACT
    fireEvent.click(modalApply);
    await wait();

    // ARRNGE
    const errorMessage = getByText('Must not be empty');

    // ASSERT
    expect(errorMessage).toBeTruthy();
  });

  it('should show 2 visible and 2 hidden columns', async () => {
    // ARRANGE
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    const { queryAllByTestId } = renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, '' ));
    const hiddenColumns = queryAllByTestId('ds-column-manager-hidden-item');
    const visibleColumns = queryAllByTestId('ds-column-manager-visible-item');

    // ASSERT
    expect(hiddenColumns.length).toBe(2);
    expect(visibleColumns.length).toBe(2);
  });

  it('should show move first column to hidden list', async () => {
    // ARRANGE
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    const { queryAllByTestId } = renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, '' ));
    let visibleColumns = queryAllByTestId('ds-column-manager-visible-item');

    // ACT
    const firstItem = visibleColumns[0];
    const firstSwitch = firstItem.querySelector('.ant-switch');
    firstSwitch && fireEvent.click(firstSwitch);
    await wait();
    const hiddenColumns = queryAllByTestId('ds-column-manager-hidden-item');
    visibleColumns = queryAllByTestId('ds-column-manager-visible-item');

    // ASSERT
    expect(hiddenColumns.length).toBe(3);
    expect(visibleColumns.length).toBe(1);
  });

  it('should show columns which contains `city` in name', async () => {
    // ARRANGE
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    const { queryAllByTestId, getByPlaceholderText } = renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, '' ));

    // ACT
    fireEvent.change(getByPlaceholderText('Search'), {target: {value: 'City'}});
    await wait();
    const filteredColumns = queryAllByTestId('ds-column-manager-filtered-item');

    // ASSERT
    expect(filteredColumns.length).toBe(1);
  });

  it('should show ItemFilter component', async () => {
    // ARRANGE
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    const { getByTestId, getByText } = renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, '' ));

    // ACT
    fireEvent.click(getByTestId('ds-column-manager-show-filters'));
    await wait();

    // ASSERT
    expect(getByText('Item filter')).toBeTruthy();
  })

});
