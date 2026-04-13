import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { HoverableSuffix } from '../components/HoverableSuffix/HoverableSuffix';

describe('HoverableSuffix', () => {
  it('should render hoverContent when hovered', () => {
    renderWithProvider(
      <HoverableSuffix
        hovered={true}
        hoverContent={<span data-testid="hover">Hover</span>}
      />,
    );
    const hoverEl = screen.getByTestId('hover');
    expect(hoverEl).toBeInTheDocument();
    expect(hoverEl.parentElement).toBeVisible();
  });

  it('should hide hoverContent when not hovered', () => {
    renderWithProvider(
      <HoverableSuffix
        hovered={false}
        hoverContent={<span data-testid="hover">Hover</span>}
      />,
    );
    const hoverEl = screen.getByTestId('hover');
    expect(hoverEl.parentElement).not.toBeVisible();
  });

  it('should show defaultContent when not hovered', () => {
    renderWithProvider(
      <HoverableSuffix
        hovered={false}
        hoverContent={<span data-testid="hover">Hover</span>}
        defaultContent={<span data-testid="default">Default</span>}
      />,
    );
    const defaultEl = screen.getByTestId('default');
    expect(defaultEl.parentElement).toBeVisible();
    expect(screen.getByTestId('hover').parentElement).not.toBeVisible();
  });

  it('should show hoverContent and hide defaultContent when hovered', () => {
    renderWithProvider(
      <HoverableSuffix
        hovered={true}
        hoverContent={<span data-testid="hover">Hover</span>}
        defaultContent={<span data-testid="default">Default</span>}
      />,
    );
    expect(screen.getByTestId('hover').parentElement).toBeVisible();
    expect(screen.getByTestId('default').parentElement).not.toBeVisible();
  });
});
