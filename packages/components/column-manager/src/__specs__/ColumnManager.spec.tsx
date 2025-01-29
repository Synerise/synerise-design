import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithProvider from '@synerise/ds-utils/dist/testing/renderWithProvider/renderWithProvider';
import { ViewMeta } from '../ColumnManager.types';
import ColumnManager from '../ColumnManager';
import { Column } from '../ColumnManagerItem/ColumManagerItem.types';

interface View {
  meta: ViewMeta;
  columns: Column[];
}

const ITEM_FILTER_TEXTS = {
  activateItemTitle: 'By activating this filter, you will cancel your unsaved filter settings',
  activate: 'Activate',
  cancel: 'Cancel',
  deleteConfirmationTitle: 'Delete filter',
  deleteConfirmationDescription:
    'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.',
  deleteLabel: 'Delete',
  deleteConfirmationYes: 'Yes',
  deleteConfirmationNo: 'No',
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
    chosen: false,
    selected: false,
  },
  {
    id: '1',
    name: 'City',
    visible: true,
    type: 'text',
    fixed: undefined,
    chosen: false,
    selected: false,
  },
  {
    id: '2',
    name: 'Language',
    visible: false,
    type: 'text',
    fixed: undefined,
    chosen: false,
    selected: false,
  },
  {
    id: '3',
    name: 'Clients numbers',
    visible: false,
    type: 'number',
    fixed: undefined,
    chosen: false,
    selected: false,
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

const CATEGORIES = [
  {
    label: 'All filters',
    hasMore: false,
    items: [
      {
        id: '0000',
        name: 'Filter #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: '01-05-2020 12:02',
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
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
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
      },
    ],
  },
  {
    label: 'My filters',
    hasMore: false,
    items: [
      {
        id: '0002',
        name: 'Filter #3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: '01-05-2020 12:02',
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
        columns: COLUMNS,
      },
      {
        id: '0003',
        name: 'Filter #4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: '01-12-2019 12:02',
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
      },
    ],
  },
];

const COLUMN_MANAGER = (
  visible: boolean = true,
  hide: () => void = () => {},
  onSave: (currentView: View) => void = () => {},
  onApply = () => {},
  selectedFilter = ''
) => (
  <ColumnManager
    hide={hide}
    visible={visible}
    columns={COLUMNS}
    onSave={onSave}
    onApply={onApply}
    texts={TEXTS}
    itemFilterConfig={{
      removeItem: (params: { id: string }) => {},
      editItem: (params: { id: string; name: string }) => {},
      selectItem: (params: { id: string }) => {},
      duplicateItem: (params: { id: string }) => {},
      selectedItemId: selectedFilter,
      categories: CATEGORIES,
      items: FILTERS,
      texts: ITEM_FILTER_TEXTS,
    }}
  />
);

describe('ColumnManager', () => {
  it('should render', () => {
    renderWithProvider(
      COLUMN_MANAGER(
        true,
        () => {},
        () => {},
        () => {},
        ''
      )
    );

    //ASSERT
    expect(screen.getByText('Manage columns')).toBeTruthy();
    expect(screen.getByText('Visible')).toBeTruthy();
    expect(screen.getByText('Hidden')).toBeTruthy();
    expect(screen.getByText('Save view')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
    expect(screen.getByText('Apply')).toBeTruthy();
  });

  it('should close himself when close or cancel button has been clicked', () => {
    const hide = jest.fn();
    renderWithProvider(
      COLUMN_MANAGER(
        true,
        hide,
        () => {},
        () => {},
        ''
      )
    );

    fireEvent.click(screen.getByTestId('ds-column-manager-close'));
    fireEvent.click(screen.getByTestId('ds-column-manager-cancel'));

    expect(hide).toBeCalledTimes(2);
  });

  it('should call onApply function with current columns configuration', () => {
    const hide = jest.fn();
    const apply = jest.fn();
    renderWithProvider(COLUMN_MANAGER(true, hide, () => {}, apply, ''));

    fireEvent.click(screen.getByTestId('ds-column-manager-apply'));

    expect(apply).toBeCalledWith(COLUMNS, undefined);
  });

  it('should save new filter', async () => {
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, ''));

    fireEvent.click(screen.getByText('Save view'));
    await waitFor(async () => expect(await screen.findByPlaceholderText('Name')).toBeInTheDocument());

    const nameInput = screen.getByPlaceholderText('Name');
    const modalApply = screen.getByTestId('ds-modal-apply');

    fireEvent.change(nameInput, { target: { value: 'Test name' } });
    fireEvent.click(modalApply);

    expect(save).toBeCalledWith({ meta: { name: 'Test name', description: '' }, columns: COLUMNS });
  });

  it('should show validation error on new filter modal', async () => {
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, ''));

    fireEvent.click(screen.getByText('Save view'));
    await waitFor(async () => expect(await screen.findByTestId('ds-modal-apply')).toBeInTheDocument());

    const modalApply = screen.getByTestId('ds-modal-apply');

    fireEvent.click(modalApply);
    await waitFor(async () => expect(await screen.findByText('Must not be empty')));

    const errorMessage = screen.getByText('Must not be empty');

    expect(errorMessage).toBeTruthy();
  });

  it('should show 2 visible and 2 hidden columns', async () => {
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, ''));
    const hiddenColumns = screen.queryAllByTestId('ds-column-manager-hidden-item');
    const visibleColumns = screen.queryAllByTestId('ds-column-manager-visible-item');

    expect(hiddenColumns.length).toBe(2);
    expect(visibleColumns.length).toBe(2);
  });

  it('should show move first column to hidden list', async () => {
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, ''));
    let visibleColumns = screen.queryAllByTestId('ds-column-manager-visible-item');

    const firstItem = visibleColumns[0];
    const firstSwitch = firstItem.querySelector('.ant-switch');
    firstSwitch && fireEvent.click(firstSwitch);
    await waitFor(() => {
      const hiddenColumns = screen.queryAllByTestId('ds-column-manager-hidden-item');
      expect(hiddenColumns.length).toBe(3);
    });

    visibleColumns = screen.queryAllByTestId('ds-column-manager-visible-item');

    expect(visibleColumns.length).toBe(1);
  });

  it('should show columns which contains `city` in name', async () => {
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, ''));

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'City' } });
    await waitFor(() => {
      const filteredColumns = screen.queryAllByTestId('ds-column-manager-filtered-item');
      expect(filteredColumns.length).toBe(1);
    });
  });

  it('should show ItemFilter component', async () => {
    const hide = jest.fn();
    const apply = jest.fn();
    const save = jest.fn();
    renderWithProvider(COLUMN_MANAGER(true, hide, save, apply, ''));

    fireEvent.click(screen.getByTestId('ds-column-manager-show-filters'));
    await waitFor(() => expect(screen.getByText('Item filter')).toBeTruthy());
  });
});
