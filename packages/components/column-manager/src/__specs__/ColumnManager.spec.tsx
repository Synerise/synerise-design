import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import ColumnManager from '../ColumnManager';
import type { Column } from '../ColumnManager.types';
import { ColumnManagerItem } from '../ColumnManagerItem/ColumnManagerItem';

vi.mock('@synerise/ds-utils', async () => {
  const actual = await vi.importActual('@synerise/ds-utils');
  return {
    ...actual,
    useResizeObserver: (ref: any, callback: any) => {
      React.useEffect(() => {
        callback({ height: 500, width: 300 });
      }, [callback]);
    },
  };
});

vi.mock('@synerise/ds-scrollbar', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('react-window', () => ({
  FixedSizeList: ({ children, itemCount, itemData }: any) => (
    <div>
      {itemData.map((item: any, index: number) =>
        children({ index, style: {}, data: itemData })
      )}
    </div>
  ),
}));

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

const MARKUP_NAME = '<img src=x onerror=alert(1)>Name';
const BOLD_NAME = '<b>bold</b>';
const SPECIAL_NAME = 'Tom & Jerry <3 🎉';

const renderWithColumns = (columns: Column[]) =>
  renderWithProvider(
    <ColumnManager
      hide={() => {}}
      visible
      columns={columns}
      onApply={() => {}}
      texts={TEXTS}
    />,
  );

const column = (id: string, name: string): Column => ({
  id,
  name,
  visible: true,
});

const search = (value: string) =>
  fireEvent.change(screen.getByPlaceholderText('Search'), {
    target: { value },
  });

const getRow = () => screen.getByTestId('ds-column-manager-item');

const getHighlights = (row: HTMLElement) =>
  row.querySelectorAll('.search-highlight');

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
    const hide = vi.fn();
    renderWithProvider(COLUMN_MANAGER(true, hide, () => {}));

    fireEvent.click(screen.getByTestId('ds-column-manager-close'));
    fireEvent.click(screen.getByTestId('ds-column-manager-cancel'));

    expect(hide).toBeCalledTimes(2);
  });

  it('should call onApply function with current columns configuration', () => {
    const hide = vi.fn();
    const apply = vi.fn();
    renderWithProvider(COLUMN_MANAGER(true, hide, apply));

    fireEvent.click(screen.getByTestId('ds-column-manager-apply'));

    expect(apply).toBeCalledWith(COLUMNS);
  });

  it('should show columns which contains `city` in name', async () => {
    const hide = vi.fn();
    const apply = vi.fn();

    renderWithProvider(COLUMN_MANAGER(true, hide, apply));

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'City' } });

    await waitFor(() => {
      const filteredColumns = screen.queryAllByTestId('ds-column-manager-item');
      expect(filteredColumns.length).toBe(1);
    });
  });

  it('should show no results message', async () => {
    const hide = vi.fn();
    const apply = vi.fn();

    renderWithProvider(COLUMN_MANAGER(true, hide, apply));

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'No such item' },
    });
    await waitFor(() => {
      expect(screen.getByText('No results')).toBeInTheDocument();
    });
  });

  it('lets the search icon take its colour from the search bar', () => {
    renderWithProvider(
      COLUMN_MANAGER(
        true,
        () => {},
        () => {},
      ),
    );

    expect(document.querySelector('svg.search-m')).toHaveStyle(
      'color: inherit',
    );
  });

  describe('column names', () => {
    it('renders markup in a name as literal text', () => {
      renderWithColumns([column('0', MARKUP_NAME), column('1', BOLD_NAME)]);

      const [markupRow, boldRow] = screen.getAllByTestId(
        'ds-column-manager-item',
      );
      expect(markupRow).toHaveTextContent(MARKUP_NAME);
      expect(boldRow).toHaveTextContent(BOLD_NAME);
      expect(markupRow.querySelector('img')).toBeNull();
      expect(boldRow.querySelector('b')).toBeNull();
    });

    it('renders markup in a name as literal text while searching', async () => {
      renderWithColumns([column('0', MARKUP_NAME)]);

      search('onerror');

      await waitFor(() => {
        expect(getHighlights(getRow())).toHaveLength(1);
      });
      const row = getRow();
      expect(row).toHaveTextContent(MARKUP_NAME);
      expect(row.querySelector('img')).toBeNull();
      expect(getHighlights(row)[0]).toHaveTextContent('onerror');
    });

    it('wraps a case-insensitive match in .search-highlight', async () => {
      renderWithProvider(COLUMN_MANAGER());

      search('city');

      await waitFor(() => {
        expect(getHighlights(getRow())).toHaveLength(1);
      });
      expect(getHighlights(getRow())[0].textContent).toBe('City');
      expect(getRow()).toHaveTextContent('City');
    });

    it.each([
      ['start', 'Use'],
      ['end', 'name'],
    ])('highlights a match at the %s of the name', async (_, query) => {
      renderWithProvider(COLUMN_MANAGER());

      search(query);

      await waitFor(() => {
        expect(getHighlights(getRow())).toHaveLength(1);
      });
      expect(getHighlights(getRow())[0].textContent).toBe(query);
      expect(getRow()).toHaveTextContent('User name');
    });

    it('renders &, < and emoji unchanged, with and without a query', async () => {
      renderWithColumns([column('0', SPECIAL_NAME)]);

      expect(getRow()).toHaveTextContent(SPECIAL_NAME);

      search('<3');

      await waitFor(() => {
        expect(getHighlights(getRow())).toHaveLength(1);
      });
      expect(getHighlights(getRow())[0].textContent).toBe('<3');
      expect(getRow()).toHaveTextContent(SPECIAL_NAME);
    });

    it('leaves the name as it is when the query does not match', () => {
      renderWithProvider(
        <ColumnManagerItem
          id="0"
          item={column('0', 'City')}
          searchQuery="xyz"
          switchAction={() => {}}
          texts={{ ...TEXTS, switchOn: 'Show', switchOff: 'Hide' }}
        />,
      );

      const row = getRow();
      expect(within(row).getByText('City')).toBeInTheDocument();
      expect(getHighlights(row)).toHaveLength(0);
    });
  });
});
