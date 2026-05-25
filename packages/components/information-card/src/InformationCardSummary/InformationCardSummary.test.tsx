import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { InformationCardSummary } from './InformationCardSummary';

describe('InformationCardSummary', () => {
  it('renders icon + label for each item', () => {
    renderWithProvider(
      <InformationCardSummary
        items={[
          { icon: <span>★</span>, label: 621 },
          { icon: <span>♦</span>, label: 43 },
        ]}
      />,
    );

    const wrapper = screen.getByTestId('information-card-summary');
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByText('621')).toBeInTheDocument();
    expect(screen.getByText('43')).toBeInTheDocument();
    expect(screen.getByText('★')).toBeInTheDocument();
    expect(screen.getByText('♦')).toBeInTheDocument();
  });
});
