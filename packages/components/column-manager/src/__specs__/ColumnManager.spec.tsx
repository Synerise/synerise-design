import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import ColumnManager from '../ColumnManager';

const TEXTS = {
  title: 'Manage columns',
  searchPlaceholder: 'Search',
  noResults: 'No results',
  cancel: 'Cancel',
  apply: 'Apply',
  clear: 'Clear',
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
    key: '2',
    name: 'Language',
    visible: false,
    type: 'text',
    fixed: undefined,
    chosen: false,
    selected: false,
  },
  {
    id: '3',
    key: '3',
    name: 'Clients numbers',
    visible: false,
    type: 'number',
    fixed: undefined,
    chosen: false,
    selected: false,
  },
];

const COLUMN_MANAGER = (
  visible: boolean = true,
  hide: () => void = () => {},
  onApply = () => {},
) => (
  <ColumnManager
    hide={hide}
    visible={visible}
    columns={COLUMNS}
    onApply={onApply}
    texts={TEXTS}
  />
);

describe('ColumnManager', () => {
  it('should render', () => {
    renderWithProvider(
      COLUMN_MANAGER(
        true,
        () => {},
        () => {},
      ),
    );

    expect(screen.getByText('Manage columns')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });

  it('should close himself when close or cancel button has been clicked', () => {
    const hide = jest.fn();
    renderWithProvider(COLUMN_MANAGER(true, hide, () => {}));

    fireEvent.click(screen.getByTestId('ds-column-manager-close'));
    fireEvent.click(screen.getByTestId('ds-column-manager-cancel'));

    expect(hide).toBeCalledTimes(2);
  });

  it('should call onApply function with current columns configuration', () => {
    const hide = jest.fn();
    const apply = jest.fn();
    renderWithProvider(COLUMN_MANAGER(true, hide, apply));

    fireEvent.click(screen.getByTestId('ds-column-manager-apply'));

    expect(apply).toBeCalledWith(COLUMNS);
  });

  it('should show columns which contains `city` in name', async () => {
    const hide = jest.fn();
    const apply = jest.fn();

    renderWithProvider(COLUMN_MANAGER(true, hide, apply));

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'City' },
    });
    await waitFor(() => {
      const filteredColumns = screen.queryAllByTestId('ds-column-manager-item');
      expect(filteredColumns.length).toBe(1);
    });
  });

  it('should show no results message', async () => {
    const hide = jest.fn();
    const apply = jest.fn();

    renderWithProvider(COLUMN_MANAGER(true, hide, apply));

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'No such item' },
    });
    await waitFor(() => {
      expect(screen.getByText('No results')).toBeInTheDocument();
    });
  });
});
