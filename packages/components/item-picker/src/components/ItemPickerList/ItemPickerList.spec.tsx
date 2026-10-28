import React from 'react';

import { renderWithProvider, sleep } from '@synerise/ds-core/testing';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { LoaderProps } from '../ItemPickerNew/ItemPickerNew.types';
import { ItemPickerList } from './ItemPickerList';

const FLAT_DATA_SOURCE = [...new Array(50)].map((i, k) => ({
  text: `Item ${k + 1}`,
}));

const ACTIONS = [...new Array(5)].map((i, k) => ({
  id: `action-${k + 1}`,
  text: `Action ${k + 1}`,
  actionType: 'custom' as const,
  onClick: () => {},
}));

const SECTIONS = [
  {
    id: 'SECTION-A',
    text: 'section A',
  },
  {
    id: 'SECTION-B',
    text: 'section B',
  },
];
const SECTION_WITH_FOLDERS = [
  {
    id: 'SECTION-WITH-FOLDERS',
    text: 'Section with folders',
    folders: [
      {
        id: 'SECTION-A',
        text: 'folder A',
      },
      {
        id: 'SECTION-B',
        text: 'folder B',
      },
    ],
  },
];

const DATA_SOURCE = [...new Array(50)].map((i, k) => ({
  text: `Item ${k + 1}`,
  sectionId: k % 2 ? 'SECTION-A' : 'SECTION-B',
}));

/**
 * jsdom lays nothing out, so rows report a height the way a browser would: a "Tall" row's
 * content is 64px, any other 32px, and the row's own `min-height` still applies.
 */
const mockRowHeights = () => {
  const original = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  );
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement) {
      if (this.style.position !== 'absolute') {
        return 0;
      }
      const contentHeight = this.textContent?.includes('Tall') ? 64 : 32;
      return Math.max(parseFloat(this.style.minHeight) || 0, contentHeight);
    },
  });
  return () => {
    if (original) {
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', original);
    }
  };
};

const rowTop = (text: string) =>
  (screen.getByText(text).closest('[style*="absolute"]') as HTMLElement).style
    .top;

describe('ItemPickerList', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });
  it('should render flat list', async () => {
    const onItemSelect = vi.fn();
    renderWithProvider(
      <ItemPickerList onItemSelect={onItemSelect} items={FLAT_DATA_SOURCE} />,
    );
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  it('keeps the same row nodes when the parent re-renders', () => {
    const onItemSelect = vi.fn();
    const { rerender } = renderWithProvider(
      <ItemPickerList
        onItemSelect={onItemSelect}
        items={FLAT_DATA_SOURCE}
        scrollbarProps={{}}
      />,
    );
    const rowBefore = screen.getByText('Item 2');

    rerender(
      <ItemPickerList
        onItemSelect={onItemSelect}
        items={FLAT_DATA_SOURCE}
        scrollbarProps={{}}
      />,
    );

    expect(screen.getByText('Item 2')).toBe(rowBefore);
  });
  it('renders and then lists the items when they arrive after an undefined start', () => {
    const onItemSelect = vi.fn();
    const pendingItems = undefined as unknown as typeof FLAT_DATA_SOURCE;
    const { rerender } = renderWithProvider(
      <ItemPickerList onItemSelect={onItemSelect} items={pendingItems} />,
    );
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();

    rerender(
      <ItemPickerList onItemSelect={onItemSelect} items={FLAT_DATA_SOURCE} />,
    );

    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  it('does not show the error state for a load it cancelled itself', async () => {
    const loadItems = vi.fn(
      ({ searchQuery, abortController }: LoaderProps) =>
        new Promise<{ items: typeof FLAT_DATA_SOURCE; total: number }>(
          (resolve, reject) => {
            const timeout = setTimeout(() => {
              const matching = FLAT_DATA_SOURCE.filter((item) =>
                item.text.includes(searchQuery ?? ''),
              );
              resolve({ items: matching, total: matching.length });
            }, 500);
            abortController?.signal.addEventListener('abort', () => {
              clearTimeout(timeout);
              reject(new DOMException('Aborted', 'AbortError'));
            });
          },
        ),
    );
    renderWithProvider(
      <ItemPickerList
        texts={{ basicSearchPlaceholder: 'SEARCH' }}
        onItemSelect={vi.fn()}
        items={{ loadItems }}
      />,
    );
    await screen.findByText('Item 2', {}, { timeout: 2000 });

    const input = screen.getByPlaceholderText('SEARCH');
    await userEvent.type(input, 'Item 1');
    await sleep(400);
    await userEvent.type(input, '0');

    await screen.findByText('Item 10', {}, { timeout: 2000 });
    expect(screen.queryByText('Items can`t be loaded')).not.toBeInTheDocument();
  });
  it('does not page or close with "All items loaded" when everything fits on the first page', async () => {
    const loadedItems = FLAT_DATA_SOURCE.slice(0, 2);
    const loadItems = vi.fn(async ({ page }: LoaderProps) => ({
      items: page === 0 ? loadedItems : [],
      total: loadedItems.length,
    }));
    renderWithProvider(
      <ItemPickerList onItemSelect={vi.fn()} items={{ loadItems }} />,
    );
    await screen.findByText('Item 2');
    await sleep(500);

    expect(loadItems).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('All items loaded')).not.toBeInTheDocument();
  });
  it('measures a title against its own height, not the large row that stood at its index', async () => {
    // jsdom has no layout: a row is as tall as its content (50px for a large row, 32px otherwise)
    // or its min-height floor, whichever is taller.
    const offsetHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetHeight',
    );
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get(this: HTMLElement) {
        const content = this.querySelector('[data-row-size="large"]') ? 50 : 32;
        return Math.max(parseFloat(this.style.minHeight) || 0, content);
      },
    });
    try {
      const largeItems = FLAT_DATA_SOURCE.slice(0, 6).map((item) => ({
        ...item,
        size: 'large' as const,
        prefixel: <span data-row-size="large" />,
      }));
      renderWithProvider(
        <ItemPickerList
          texts={{ basicSearchPlaceholder: 'SEARCH' }}
          onItemSelect={vi.fn()}
          recents={FLAT_DATA_SOURCE.slice(10, 13)}
          items={largeItems}
        />,
      );
      const titleFloor = () =>
        screen.getByText('Items').closest<HTMLElement>('[style*="min-height"]')
          ?.style.minHeight;
      expect(titleFloor()).toBe('32px');

      const search = screen.getByPlaceholderText('SEARCH');
      await userEvent.type(search, 'Item');
      await screen.findByText('Results');
      await userEvent.clear(search);
      await screen.findByText('Items');

      expect(titleFloor()).toBe('32px');
    } finally {
      if (offsetHeight) {
        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', offsetHeight);
      }
    }
  });
  it('should render recents', async () => {
    const onItemSelect = vi.fn();
    renderWithProvider(
      <ItemPickerList
        onItemSelect={onItemSelect}
        recents={FLAT_DATA_SOURCE}
        items={[]}
      />,
    );
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  it('should render actions', async () => {
    const onItemSelect = vi.fn();
    renderWithProvider(
      <ItemPickerList
        onItemSelect={onItemSelect}
        actions={ACTIONS}
        items={[]}
      />,
    );
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });
  it('should fire onItemSelect', async () => {
    const onItemSelect = vi.fn();
    renderWithProvider(
      <ItemPickerList onItemSelect={onItemSelect} items={FLAT_DATA_SOURCE} />,
    );
    fireEvent.click(screen.getByText('Item 2'));
    expect(onItemSelect).toHaveBeenCalled();
  });
  it('should render items in sections', async () => {
    const onItemSelect = vi.fn();
    renderWithProvider(
      <ItemPickerList
        onItemSelect={onItemSelect}
        sections={SECTIONS}
        items={DATA_SOURCE}
      />,
    );
    expect(screen.getByText('section A')).toBeInTheDocument();
    expect(screen.getByText('section B')).toBeInTheDocument();
  });
  it('should render folders in sections', async () => {
    const onItemSelect = vi.fn();
    renderWithProvider(
      <ItemPickerList
        onItemSelect={onItemSelect}
        sections={SECTION_WITH_FOLDERS}
        items={DATA_SOURCE}
      />,
    );
    expect(screen.getByText('Section with folders')).toBeInTheDocument();
    expect(screen.getByText('folder A')).toBeInTheDocument();
    expect(screen.getByText('folder B')).toBeInTheDocument();
  });
  it('should render items from folder', async () => {
    const onItemSelect = vi.fn();
    renderWithProvider(
      <ItemPickerList
        onItemSelect={onItemSelect}
        sections={SECTION_WITH_FOLDERS}
        items={DATA_SOURCE}
      />,
    );

    fireEvent.click(screen.getByText('folder A'));
    await waitFor(() => expect(screen.getByText('Item 2')).toBeInTheDocument());
  });
  
  describe('section tooltips', () => {
    it('should show an info icon next to the title of a section with a tooltip', () => {
      renderWithProvider(
        <ItemPickerList
          onItemSelect={vi.fn()}
          sections={[{ ...SECTIONS[0], tooltip: 'About section A' }, SECTIONS[1]]}
          items={DATA_SOURCE}
        />,
      );
      // Opening the tooltip is ds-tooltip's own behaviour; here only its placement matters.
      expect(screen.getAllByTestId('title-tooltip-icon')).toHaveLength(1);
      expect(
        screen
          .getByText('section A')
          .closest('[style*="absolute"]')
          ?.querySelector('[data-testid="title-tooltip-icon"]'),
      ).toBeInTheDocument();
    });

    it('should put a folder tooltip on the title row, not on the folder row', () => {
      renderWithProvider(
        <ItemPickerList
          onItemSelect={vi.fn()}
          sections={[
            {
              ...SECTION_WITH_FOLDERS[0],
              tooltip: 'About the section',
              folders: [
                { id: 'SECTION-A', text: 'folder A', tooltip: 'About folder A' },
                { id: 'SECTION-B', text: 'folder B' },
              ],
            },
          ]}
          items={DATA_SOURCE}
        />,
      );
      // The section's title row carries its tooltip; the folder A row opens the folder.
      expect(screen.getAllByTestId('title-tooltip-icon')).toHaveLength(1);
      expect(
        screen
          .getByText('Section with folders')
          .closest('[style*="absolute"]')
          ?.querySelector('[data-testid="title-tooltip-icon"]'),
      ).toBeInTheDocument();
    });

    it("should show the folder's tooltip on its title when listing folders' items", async () => {
      renderWithProvider(
        <ItemPickerList
          onItemSelect={vi.fn()}
          sections={[
            {
              id: 'SECTION-WITH-FOLDERS',
              text: 'Section with folders',
              folders: [
                {
                  id: 'PARENT',
                  text: 'parent folder',
                  folders: [
                    {
                      id: 'SECTION-A',
                      text: 'folder A',
                      tooltip: 'About folder A',
                    },
                    { id: 'SECTION-B', text: 'folder B' },
                  ],
                },
              ],
            },
          ]}
          items={DATA_SOURCE}
        />,
      );
      // Inside the parent folder, each child folder lists its items under its own title.
      fireEvent.click(screen.getByText('parent folder'));
      await waitFor(() =>
        expect(screen.getAllByTestId('title-tooltip-icon')).toHaveLength(1),
      );
      expect(
        screen
          .getByText('folder A')
          .closest('[style*="absolute"]')
          ?.querySelector('[data-testid="title-tooltip-icon"]'),
      ).toBeInTheDocument();
    });
  });

  describe('measured row heights', () => {
    let restoreRowHeights: () => void;
    beforeEach(() => {
      restoreRowHeights = mockRowHeights();
    });
    afterEach(() => {
      restoreRowHeights();
    });

    it('should lay rows out at their measured heights', async () => {
      renderWithProvider(
        <ItemPickerList
          onItemSelect={vi.fn()}
          items={[{ text: 'Tall 1' }, { text: 'Tall 2' }]}
        />,
      );
      // The "Items" title (32px) and one tall row (64px) above.
      await waitFor(() => expect(rowTop('Tall 2')).toBe('96px'));
    });

    it('should let a row shrink when its key stood for a taller row before', async () => {
      // Keyless rows are identified by position, so the short rows inherit the tall rows'
      // measurements — exactly what going back from a folder of tall rows does.
      const { rerender } = renderWithProvider(
        <ItemPickerList
          onItemSelect={vi.fn()}
          items={[{ text: 'Tall 1' }, { text: 'Tall 2' }]}
        />,
      );
      await waitFor(() => expect(rowTop('Tall 2')).toBe('96px'));

      rerender(
        <ItemPickerList
          onItemSelect={vi.fn()}
          items={[{ text: 'Short 1' }, { text: 'Short 2' }]}
        />,
      );
      await waitFor(() => expect(rowTop('Short 2')).toBe('64px'));
    });
  });

  it('should render basic search if no actions', async () => {
    const onItemSelect = vi.fn();
    renderWithProvider(
      <ItemPickerList
        texts={{ basicSearchPlaceholder: 'SEARCH BASIC' }}
        onItemSelect={onItemSelect}
        sections={SECTION_WITH_FOLDERS}
        items={DATA_SOURCE}
      />,
    );
    await waitFor(() => expect(screen.getByPlaceholderText('SEARCH BASIC')).toBeInTheDocument());
  });

  it('should render search results from all folders', async () => {
    const SEARCH_QUERY = 'Item 2';

    const onItemSelect = vi.fn();
    renderWithProvider(
      <ItemPickerList
        texts={{ searchPlaceholder: 'SEARCH' }}
        onItemSelect={onItemSelect}
        actions={[]}
        sections={SECTION_WITH_FOLDERS}
        items={DATA_SOURCE}
      />,
    );

    await userEvent.type(screen.getByPlaceholderText('SEARCH'), SEARCH_QUERY, {
      delay: 100,
    });

    await screen.findAllByText('Show more');
    expect(screen.getByText('folder B')).toBeInTheDocument();
    expect(screen.getByText('folder A')).toBeInTheDocument();

    await waitFor(() => {
      const matches = screen.getAllByText(SEARCH_QUERY);
      expect(matches).toHaveLength(8);
    });
  });
});
