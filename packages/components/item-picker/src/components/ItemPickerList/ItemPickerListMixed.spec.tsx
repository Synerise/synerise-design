import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Action } from '../ItemPickerNew/types/actions.types';
import type {
  MixedLoaderConfig,
  LevelEntry,
  LoadLevelParams,
} from '../ItemPickerNew/types/mixedLoader.types';
import { ItemPickerList } from './ItemPickerList';

type Item = { id: string; text: string; code: string };
type Node = {
  id: string;
  parentId: string | null;
  kind: 'folder' | 'item';
  text: string;
  code?: string;
  disabled?: boolean;
};

const NODES: Node[] = [
  { id: 'a', parentId: null, kind: 'folder', text: 'Folder A' },
  { id: 'a1', parentId: 'a', kind: 'folder', text: 'Folder A1' },
  { id: 'a1-1', parentId: 'a1', kind: 'item', text: 'Item A1.1', code: 'X-11' },
  { id: 'a-1', parentId: 'a', kind: 'item', text: 'Item A.1', code: 'X-1' },
  { id: 'b', parentId: null, kind: 'folder', text: 'Folder B', disabled: true },
  { id: 'c', parentId: null, kind: 'folder', text: 'Folder C' },
  { id: 'r-1', parentId: null, kind: 'item', text: 'Item 1', code: 'R-1' },
  { id: 'r-2', parentId: null, kind: 'item', text: 'Item 2', code: 'R-2' },
];

const isInside = (node: Node, folderId: string): boolean => {
  const parent = NODES.find((candidate) => candidate.id === node.parentId);
  if (!parent) {
    return false;
  }
  return parent.id === folderId || isInside(parent, folderId);
};

const pathOf = (folderId: string | null) => {
  const steps = [];
  let current = NODES.find((node) => node.id === folderId);
  while (current) {
    steps.unshift({ id: current.id, text: current.text });
    const parentId = current.parentId;
    current = NODES.find((node) => node.id === parentId);
  }
  return [{ id: null, text: 'All' }, ...steps];
};

const toEntry = (node: Node): LevelEntry<Item> =>
  node.kind === 'folder'
    ? {
        type: 'folder',
        folder: {
          id: node.id,
          text: node.text,
          disabled: node.disabled,
          disabledReason: node.disabled ? 'Empty' : undefined,
        },
      }
    : {
        type: 'item',
        item: { id: node.id, text: node.text, code: node.code ?? '' },
      };

const loadLevel = vi.fn(
  async ({ folderId, searchQuery, searchKey, page, limit }: LoadLevelParams) => {
    const needle = searchQuery.toLowerCase();
    const inScope = needle
      ? NODES.filter(
          (node) => folderId === null || isInside(node, folderId),
        ).filter((node) =>
          searchKey === 'code'
            ? node.kind === 'item' && node.code?.toLowerCase().includes(needle)
            : node.text.toLowerCase().includes(needle),
        )
      : NODES.filter((node) => node.parentId === folderId);
    const ordered = [
      ...inScope.filter((node) => node.kind === 'folder'),
      ...inScope.filter((node) => node.kind === 'item'),
    ];
    return {
      entries: ordered.slice(page * limit, (page + 1) * limit).map(toEntry),
      total: ordered.length,
      path: pathOf(folderId),
    };
  },
);

const FOLDERS: MixedLoaderConfig<Item> = { loadLevel };

const ACTIONS: Action[] = [
  { id: 'create', actionType: 'custom', text: 'Create item', onClick: vi.fn() },
  {
    id: 'export',
    actionType: 'custom',
    text: 'Export list',
    onClick: vi.fn(),
    showInList: false,
  },
  {
    id: 'search-by',
    actionType: 'searchBy',
    text: 'Search by',
    searchParams: [
      { paramKey: 'code', paramListLabel: 'Code', paramKeyLabel: 'Code:' },
    ],
  },
  {
    id: 'search-in',
    actionType: 'searchIn',
    text: 'Search in catalog',
    loadItemsSectionId: 'catalogs',
    renderSearchInValueText: (item) => item.text,
  },
];

const RECENTS: Item[] = [{ id: 'recent-1', text: 'Recent item', code: 'Q-1' }];

const SEARCH_PLACEHOLDER = 'SEARCH';

const renderList = (
  props: Partial<React.ComponentProps<typeof ItemPickerList>> = {},
) => {
  const onItemSelect = vi.fn();
  renderWithProvider(
    <ItemPickerList<Item, undefined>
      items={FOLDERS}
      onItemSelect={onItemSelect}
      texts={{
        basicSearchPlaceholder: SEARCH_PLACEHOLDER,
        searchPlaceholder: SEARCH_PLACEHOLDER,
      }}
      {...props}
    />,
  );
  return { onItemSelect };
};

const openFolder = async (name: string) => {
  fireEvent.click(await screen.findByText(name));
};

describe('ItemPickerList in mixed mode', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
    loadLevel.mockClear();
  });

  it('lists the top level: folders first, then items, under the root name', async () => {
    renderList();
    await screen.findByText('Folder A');

    const rows = screen
      .getAllByText(/^(All|Folder [ABC]|Item [12])$/)
      .map((node) => node.textContent);
    expect(rows).toEqual([
      'All',
      'Folder A',
      'Folder B',
      'Folder C',
      'Item 1',
      'Item 2',
    ]);
    expect(loadLevel).toHaveBeenCalledWith(
      expect.objectContaining({ folderId: null, searchQuery: '', page: 0 }),
    );
  });

  it('shows Recent and the actions only at the top level', async () => {
    renderList({ recents: RECENTS, actions: ACTIONS });
    expect(await screen.findByText('Recent item')).toBeInTheDocument();
    expect(screen.getByText('Create item')).toBeInTheDocument();

    await openFolder('Folder A');
    await screen.findByText('Item A.1');

    expect(screen.queryByText('Recent item')).not.toBeInTheDocument();
    expect(screen.queryByText('Create item')).not.toBeInTheDocument();
  });

  it('opens a folder instead of selecting it, with its path in the back header', async () => {
    const { onItemSelect } = renderList();
    await openFolder('Folder A');

    expect(await screen.findByText('Folder A1')).toBeInTheDocument();
    expect(screen.getByText('Item A.1')).toBeInTheDocument();
    expect(onItemSelect).not.toHaveBeenCalled();
    expect(screen.getByTestId('dropdown-back-action-label')).toHaveTextContent(
      'All / Folder A',
    );
    expect(
      screen.getByPlaceholderText('Search in this folder'),
    ).toBeInTheDocument();
  });

  it('selects an item', async () => {
    const { onItemSelect } = renderList();
    fireEvent.click(await screen.findByText('Item 1'));

    expect(onItemSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'r-1' }),
      undefined,
    );
  });

  it('does not open a disabled folder, and shows its reason', async () => {
    renderList();
    await openFolder('Folder B');

    expect(screen.getByText('Empty')).toBeInTheDocument();
    expect(loadLevel).not.toHaveBeenCalledWith(
      expect.objectContaining({ folderId: 'b' }),
    );
  });

  it('shows the empty-folder state', async () => {
    renderList();
    await openFolder('Folder C');

    expect(await screen.findByText('This folder is empty')).toBeInTheDocument();
  });

  it('goes one level up from the back header', async () => {
    renderList();
    await openFolder('Folder A');
    await openFolder('Folder A1');
    await screen.findByText('Item A1.1');

    fireEvent.click(screen.getByTestId('dropdown-back-action-arrow'));

    expect(await screen.findByText('Item A.1')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-back-action-label')).toHaveTextContent(
      'All / Folder A',
    );
  });

  it('goes one level up on Backspace in an empty search', async () => {
    renderList();
    await openFolder('Folder A');
    await screen.findByText('Item A.1');

    fireEvent.keyDown(screen.getByPlaceholderText('Search in this folder'), {
      key: 'Backspace',
    });

    expect(await screen.findByText('Folder B')).toBeInTheDocument();
    expect(
      screen.queryByTestId('dropdown-back-action-label'),
    ).not.toBeInTheDocument();
  });

  it('opens a focused folder with → and goes up with ←', async () => {
    renderList();
    const folderRow = (await screen.findByText('Folder A')).closest<HTMLElement>(
      '.ds-item-picker-folder-row',
    );
    expect(folderRow).not.toBeNull();
    act(() => folderRow?.focus());
    fireEvent.keyDown(folderRow as HTMLElement, { key: 'ArrowRight' });

    const innerRow = (await screen.findByText('Item A.1')).closest<HTMLElement>(
      '.ds-item-picker-dropdown',
    );
    act(() => innerRow?.focus());
    fireEvent.keyDown(innerRow as HTMLElement, { key: 'ArrowLeft' });

    expect(await screen.findByText('Folder B')).toBeInTheDocument();
  });

  it('searches the level and below, flat under "Results"', async () => {
    renderList();
    await openFolder('Folder A');
    await screen.findByText('Item A.1');

    await userEvent.type(
      screen.getByPlaceholderText('Search in this folder'),
      'Item',
    );

    expect(await screen.findByText('Results')).toBeInTheDocument();
    await waitFor(() =>
      expect(loadLevel).toHaveBeenLastCalledWith(
        expect.objectContaining({ folderId: 'a', searchQuery: 'Item' }),
      ),
    );
    expect(screen.getByText('A1.1', { exact: false })).toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('lists matching actions while searching, except those kept under "/"', async () => {
    renderList({ actions: ACTIONS });
    await screen.findByText('Folder A');

    await userEvent.type(screen.getByPlaceholderText(SEARCH_PLACEHOLDER), 'e');

    await screen.findByText('Results');
    const rowTexts = Array.from(
      document.querySelectorAll('.ds-item-picker-dropdown'),
    ).map((row) => row.textContent);
    expect(rowTexts).toContain('Create item');
    expect(rowTexts).not.toContain('Export list');
  });

  it('offers every action under "/" except Search in', async () => {
    renderList({ actions: ACTIONS });
    await screen.findByText('Folder A');

    await userEvent.type(screen.getByPlaceholderText(SEARCH_PLACEHOLDER), '/');

    expect(await screen.findByText('Export list')).toBeInTheDocument();
    expect(screen.getByText('Create item')).toBeInTheDocument();
    expect(screen.getByText('Search by')).toBeInTheDocument();
    expect(screen.queryByText('Search in catalog')).not.toBeInTheDocument();
  });

  it('passes the Search-by parameter to loadLevel', async () => {
    renderList({ actions: ACTIONS });
    fireEvent.click(await screen.findByText('Search by'));
    fireEvent.click(await screen.findByText('Code'));

    await userEvent.type(screen.getByPlaceholderText(SEARCH_PLACEHOLDER), 'X');

    await waitFor(() =>
      expect(loadLevel).toHaveBeenLastCalledWith(
        expect.objectContaining({ searchKey: 'code', searchQuery: 'X' }),
      ),
    );
    expect(await screen.findByText('Item A1.1')).toBeInTheDocument();
    expect(screen.queryByText('Folder A')).not.toBeInTheDocument();
  });

  it('draws large rows in the skeleton while a large level loads', async () => {
    renderList({ items: { loadLevel, rowSize: 'large' } });

    expect(
      screen.getAllByTestId('ds-item-picker-skeleton-large-row'),
    ).toHaveLength(5);
    await screen.findByText('Folder A');
  });

  it('loads the next page of a level', async () => {
    renderList({ items: { loadLevel, limitPerPage: 4 } });
    await screen.findByText('Folder A');

    await waitFor(() =>
      expect(loadLevel).toHaveBeenCalledWith(
        expect.objectContaining({ folderId: null, page: 1, limit: 4 }),
      ),
    );
    expect(await screen.findByText('Item 2')).toBeInTheDocument();
  });
});
