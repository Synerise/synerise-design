import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Navbar from '../index';

describe('Navbar', () => {
  const DESCRIPTION = 'DESCRIPTION';
  const LOGO = 'LOGO';
  const ACTIONS = 'ACTIONS';

  it('should render logo', () => {
    // ARRANGE
    const { getByRole } = renderWithProvider(<Navbar description={DESCRIPTION} logo={LOGO} actions />);
    // ASSERT
    expect(getByRole('img')).toBeTruthy();
  });

  it('should render children', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Navbar description={DESCRIPTION} logo={LOGO} actions >
        Children
      </Navbar>
    );
    // ASSERT
    expect(getByText('Children')).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Navbar description={DESCRIPTION} logo actions />);
    // ASSERT
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should render actions', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Navbar description={DESCRIPTION} logo actions={ACTIONS} />);
    // ASSERT
    expect(getByText(ACTIONS)).toBeTruthy();
  });

});
