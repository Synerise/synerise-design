import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import Navbar from '../index';

describe('Navbar', () => {
  const DESCRIPTION = 'DESCRIPTION';
  const LOGO = 'LOGO';
  const AVATAR = 'AVATAR';
  const ACTIONS = 'ACTIONS';

  it('should render logo', () => {
    // ARRANGE
    const { getByRole } = renderWithProvider(<Navbar description={DESCRIPTION} avatar logo={LOGO} dropdown actions />);
    // ASSERT
    expect(getByRole('img')).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Navbar description={DESCRIPTION} avatar logo dropdown actions />);
    // ASSERT
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should render avatar', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(<Navbar description={DESCRIPTION} avatar={<div data-testid="AVATAR">avatar</div>} logo dropdown actions />);
    // ASSERT
    expect(getByTestId(AVATAR)).toBeTruthy();
  });

  it('should render dropdown', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <Navbar description={DESCRIPTION} avatar logo dropdown={<div data-testid="dropdown">dropdown</div>} actions />);
    // ASSERT
    expect(getByTestId('dropdown') as HTMLElement).toBeTruthy();
  });

  it('should render actions', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Navbar description={DESCRIPTION} avatar logo dropdown actions={ACTIONS} />);
    // ASSERT
    expect(getByText(ACTIONS)).toBeTruthy();
  });

});
