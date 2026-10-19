import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
