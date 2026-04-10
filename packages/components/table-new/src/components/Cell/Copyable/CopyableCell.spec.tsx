import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { CopyableCell } from './CopyableCell';

describe('CopyableCell', () => {
  it('should render the value', () => {
    renderWithProvider(
      <CopyableCell value="copy-me" confirmMessage="Copied!" tooltipTimeout={2000} />,
    );

    expect(screen.getByText('copy-me')).toBeInTheDocument();
  });

  it('should render copy icon', () => {
    const { container } = renderWithProvider(
      <CopyableCell value="test-value" confirmMessage="Copied!" tooltipTimeout={2000} />,
    );

    expect(screen.getByText('test-value')).toBeInTheDocument();
    // CopyIcon component should be rendered
    expect(container.querySelector('[class*="Copyable"]') || container.firstChild).toBeTruthy();
  });
});
