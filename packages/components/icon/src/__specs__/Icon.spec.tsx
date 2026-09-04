import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen, waitFor } from '@testing-library/react';

import Icon from '../index';

describe('Icon', () => {
  it('should render', () => {
    const TEST_TEXT = 'angle-left-m';
    renderWithProvider(<Icon title={TEST_TEXT} name={TEST_TEXT} />);

    expect(screen.getByTitle(TEST_TEXT)).toBeTruthy();
  });

  it('Should render with className', async () => {
    const { container } = renderWithProvider(<Icon iconName="VarTypeStringM" />);

    await waitFor(() =>
      expect(container.querySelector('.var-type-string-m')).toBeTruthy(),
    );
  });

  it('Should render with testid', async () => {
    renderWithProvider(<Icon iconName="VarTypeStringM" />);

    expect(
      await screen.findByTestId('ds-icon-var-type-string-m'),
    ).toBeTruthy();
  });
});
