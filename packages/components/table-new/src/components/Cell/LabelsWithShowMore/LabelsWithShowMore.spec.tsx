import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import { LabelsWithShowMore } from './LabelsWithShowMore';

const ITEMS = [
  { key: '1', name: 'Label A' },
  { key: '2', name: 'Label B' },
  { key: '3', name: 'Label C' },
  { key: '4', name: 'Label D' },
];

const TEXTS = {
  tooltip: 'Show more',
  searchPlaceholder: 'Search',
  searchClear: 'Clear',
  modalTitle: 'All Labels',
  records: 'records',
};

const renderItem = (label: string) => <span>{label}</span>;

describe('LabelsWithShowMore', () => {
  it('should render visible labels', () => {
    renderWithProvider(
      <LabelsWithShowMore
        items={ITEMS}
        numberOfVisibleItems={2}
        labelKey="name"
        renderItem={renderItem}
        texts={TEXTS}
      />,
    );

    expect(screen.getByText('Label A, Label B')).toBeInTheDocument();
  });

  it('should show "+N" when there are more items than visible', () => {
    renderWithProvider(
      <LabelsWithShowMore
        items={ITEMS}
        numberOfVisibleItems={2}
        labelKey="name"
        renderItem={renderItem}
        texts={TEXTS}
      />,
    );

    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('should not show "+N" when all items are visible', () => {
    renderWithProvider(
      <LabelsWithShowMore
        items={ITEMS}
        numberOfVisibleItems={4}
        labelKey="name"
        renderItem={renderItem}
        texts={TEXTS}
      />,
    );

    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
  });

  it('should open modal when "+N" is clicked', () => {
    renderWithProvider(
      <LabelsWithShowMore
        items={ITEMS}
        numberOfVisibleItems={2}
        labelKey="name"
        renderItem={renderItem}
        texts={TEXTS}
      />,
    );

    fireEvent.click(screen.getByText('+2'));
    expect(screen.getByText('All Labels')).toBeInTheDocument();
  });
});
