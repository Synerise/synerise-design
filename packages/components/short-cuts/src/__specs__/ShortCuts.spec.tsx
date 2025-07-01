import React from 'react';

import { ArrowDownM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-utils';
import { screen } from '@testing-library/react';

import ShortCuts from '../index';

describe('ShortCuts', () => {
  it('should render', function () {
    renderWithProvider(<ShortCuts size="L" children="ESC" />);
    expect(screen.getByText('ESC')).toBeTruthy();
  });
  it('should render icon', function () {
    const TEST_ID = 'test';
    renderWithProvider(
      <ShortCuts size="L" icon={<ArrowDownM data-testid={TEST_ID} />} />,
    );

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });
});
