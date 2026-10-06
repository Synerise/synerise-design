import React from 'react';

import { ArrowDownM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-core/testing';
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

  it.each(['light', 'dark'] as const)('should use shortcut %s theme tokens', (color) => {
    renderWithProvider(<ShortCuts size="L" color={color} children="ESC" />);
    const css = Array.from(document.querySelectorAll('style'))
      .map((el) => el.textContent)
      .join('');

    ['bg', 'border', 'text', 'shadow'].forEach((part) => {
      expect(css).toContain(`var(--ds-shortcut-theme-${color}-${part})`);
    });
    expect(css).not.toMatch(/rgba\(\s*35/);
  });
});
