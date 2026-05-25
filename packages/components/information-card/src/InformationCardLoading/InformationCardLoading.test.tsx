import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { InformationCardLoading } from './InformationCardLoading';

describe('InformationCardLoading', () => {
  it('renders the skeleton body with the test id', () => {
    renderWithProvider(<InformationCardLoading />);

    expect(screen.getByTestId('information-card-loading')).toBeInTheDocument();
  });

  it('renders three skeleton bars plus the avatar by default', () => {
    renderWithProvider(<InformationCardLoading />);

    expect(screen.getAllByTestId('ds-skeleton')).toHaveLength(3);
  });

  it('omits the footer band when hasFooter is false', () => {
    renderWithProvider(<InformationCardLoading />);

    expect(
      screen.queryByTestId('information-card-loading-footer'),
    ).not.toBeInTheDocument();
  });

  it('renders the footer band when hasFooter is true', () => {
    renderWithProvider(<InformationCardLoading hasFooter />);

    expect(
      screen.getByTestId('information-card-loading-footer'),
    ).toBeInTheDocument();
  });
});
