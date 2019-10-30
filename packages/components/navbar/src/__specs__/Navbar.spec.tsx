import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import Navbar from '../index';

describe('Navbar', () => {
  const DESCRIPTION = 'DESCRIPTION';
  const LOGO = 'LOGO';
  const AVATAR = 'AVATAR';
  const DROPDOWN = 'DROPDOWN';
  const ACTIONS = 'ACTIONS';

  it('should render logo', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Navbar description={DESCRIPTION} avatar logo={LOGO} dropdown actions />);
    // ASSERT
    expect(getByText(LOGO)).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Navbar description={DESCRIPTION} avatar logo dropdown actions />);
    // ASSERT
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should render avatar', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Navbar description={DESCRIPTION} avatar={AVATAR} logo dropdown actions />);
    // ASSERT
    expect(getByText(AVATAR)).toBeTruthy();
  });

  it('should render dropdown', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Navbar description={DESCRIPTION} avatar logo dropdown={DROPDOWN} actions />);
    // ASSERT
    expect(getByText(DROPDOWN)).toBeTruthy();
  });

  it('should render actions', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Navbar description={DESCRIPTION} avatar logo dropdown actions={ACTIONS} />);
    // ASSERT
    expect(getByText(ACTIONS)).toBeTruthy();
  });

});
