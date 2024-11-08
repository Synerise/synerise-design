import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import ShortCuts from '../index';
import { ArrowDownM } from '@synerise/ds-icon';
import { screen } from '@testing-library/react';

describe('ShortCuts', () => {
  it('should render', function() {
    renderWithProvider(
      <ShortCuts
        size='L'
        children='ESC'
      />
    );
    expect(screen.getByText('ESC')).toBeTruthy();
  });
  it('should render icon', function() {
    const TEST_ID = 'test';
    renderWithProvider(
      <ShortCuts
        size='L'
        icon={<ArrowDownM data-testid={TEST_ID}/>}
      />
    );

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  })
});