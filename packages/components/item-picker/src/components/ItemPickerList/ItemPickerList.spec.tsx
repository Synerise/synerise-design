import React from 'react';
import { getByTestId, screen, waitFor } from '@testing-library/react';

import ItemPickerList from './ItemPickerList';
import renderWithProvider from '@synerise/ds-utils/dist/testing/renderWithProvider/renderWithProvider';
import userEvent from '@testing-library/user-event';

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
  it('should render flat list', () => {
    const onItemSelect = jest.fn();
    renderWithProvider(<ItemPickerList onItemSelect={onItemSelect} items={FLAT_DATA_SOURCE} />);
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  it('should render recents', () => {
    const onItemSelect = jest.fn();
    renderWithProvider(<ItemPickerList onItemSelect={onItemSelect} recents={FLAT_DATA_SOURCE} items={[]} />);
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  it('should render actions', () => {
    const onItemSelect = jest.fn();
    renderWithProvider(<ItemPickerList onItemSelect={onItemSelect} actions={ACTIONS} items={[]} />);
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });
  it('should fire onItemSelect', () => {
    const onItemSelect = jest.fn();
    renderWithProvider(<ItemPickerList onItemSelect={onItemSelect} items={FLAT_DATA_SOURCE} />);
    userEvent.click(screen.getByText('Item 2'));
    expect(onItemSelect).toHaveBeenCalled();
  });
  it('should render items in sections', () => {
    const onItemSelect = jest.fn();
    renderWithProvider(<ItemPickerList onItemSelect={onItemSelect} sections={SECTIONS} items={DATA_SOURCE} />);
    expect(screen.getByText('section A')).toBeInTheDocument();
    expect(screen.getByText('section B')).toBeInTheDocument();
  });
  it('should render folders in sections', () => {
    const onItemSelect = jest.fn();
    renderWithProvider(
      <ItemPickerList onItemSelect={onItemSelect} sections={SECTION_WITH_FOLDERS} items={DATA_SOURCE} />
    );
    expect(screen.getByText('Section with folders')).toBeInTheDocument();
    expect(screen.getByText('folder A')).toBeInTheDocument();
    expect(screen.getByText('folder B')).toBeInTheDocument();
  });
  it('should render items from folder', async () => {
    const onItemSelect = jest.fn();
    renderWithProvider(
      <ItemPickerList onItemSelect={onItemSelect} sections={SECTION_WITH_FOLDERS} items={DATA_SOURCE} />
    );
    userEvent.click(screen.getByText('folder A'));
    await waitFor(() => expect(screen.getByText('Item 1')).toBeInTheDocument());
  });
  it('should render search results from all folders', async () => {
    const onItemSelect = jest.fn();
    renderWithProvider(
      <ItemPickerList
        texts={{ searchPlaceholder: 'SEARCH' }}
        onItemSelect={onItemSelect}
        sections={SECTION_WITH_FOLDERS}
        items={DATA_SOURCE}
      />
    );

    userEvent.type(screen.getByPlaceholderText('SEARCH'), 'Item 2');

    await waitFor(() => {
      expect(screen.getByText('folder A')).toBeInTheDocument();
      expect(screen.getByText('folder B')).toBeInTheDocument();
      expect(screen.queryByText('Item 2')).toBeInTheDocument();
    });
  });
});
