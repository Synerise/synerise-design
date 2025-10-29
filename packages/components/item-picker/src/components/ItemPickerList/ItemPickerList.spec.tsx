import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
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

describe('ItemPickerList', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });
  it('should render flat list', async () => {
    const onItemSelect = jest.fn();
    renderWithProvider(
      <ItemPickerList onItemSelect={onItemSelect} items={FLAT_DATA_SOURCE} />,
    );
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  it('should render recents', async () => {
    const onItemSelect = jest.fn();
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
    const onItemSelect = jest.fn();
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
    const onItemSelect = jest.fn();
    renderWithProvider(
      <ItemPickerList onItemSelect={onItemSelect} items={FLAT_DATA_SOURCE} />,
    );
    fireEvent.click(screen.getByText('Item 2'));
    expect(onItemSelect).toHaveBeenCalled();
  });
  it('should render items in sections', async () => {
    const onItemSelect = jest.fn();
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
    const onItemSelect = jest.fn();
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
    const onItemSelect = jest.fn();
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
  it('should render search results from all folders', async () => {
    const SEARCH_QUERY = 'Item 2';

    const onItemSelect = jest.fn();
    renderWithProvider(
      <ItemPickerList
        texts={{ searchPlaceholder: 'SEARCH' }}
        onItemSelect={onItemSelect}
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
