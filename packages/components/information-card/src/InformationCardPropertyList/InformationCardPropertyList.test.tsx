import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { InformationCardPropertyList } from './InformationCardPropertyList';

describe('InformationCardPropertyList', () => {
  it('renders label and value pairs', () => {
    renderWithProvider(
      <InformationCardPropertyList
        items={[
          { label: 'Value', value: '1234' },
          { label: 'Status', value: 'active' },
        ]}
      />,
    );

    expect(screen.getByText('Value:')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  it('renders a divider entry between rows', () => {
    renderWithProvider(
      <InformationCardPropertyList
        items={[
          { label: 'Value', value: '1234' },
          { type: 'divider' },
          { label: 'Status', value: 'active' },
        ]}
      />,
    );

    expect(screen.getAllByRole('separator')).toHaveLength(1);
  });
});
