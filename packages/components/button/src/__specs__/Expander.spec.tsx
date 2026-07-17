import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent } from '@testing-library/react';

import { Expander } from '../index';
import { ExpanderSize } from '../Expander/Expander.types';

describe('Expander', () => {
  const onClick = vi.fn();
  it('should render', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Expander></Expander>,
    );
    // ACT
    const expander = container.querySelector('.ds-expander');
    // ASSERT
    expect(expander).toBeTruthy();
  });
  it('should render with small size', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Expander size={'S'}></Expander>,
    );
    // ACT
    const expander = container.querySelector('.ds-expander');
    // ASSERT
    expect(expander).toHaveStyle(`width:${ExpanderSize.S}px`);
  });
  it('should render with medium size', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Expander size={'M'}></Expander>,
    );
    // ACT
    const expander = container.querySelector('.ds-expander');
    // ASSERT
    expect(expander).toHaveStyle(`width:${ExpanderSize.M}px`);
  });
  it('should render disabled with lower opacity', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Expander size={'M'} disabled={true}></Expander>,
    );
    // ACT
    const expander = container.querySelector('svg');
    // ASSERT — disabled dimming now comes from the --ds-buttons-disabled-opacity token (0.4). jsdom
    // can't resolve var() via getComputedStyle, so assert the token is wired into the injected styles.
    expect(expander).toBeInTheDocument();
    const injectedCss = Array.from(document.querySelectorAll('style'))
      .map((s) => s.textContent)
      .join('')
      .replace(/\s/g, '');
    expect(injectedCss).toContain('opacity:var(--ds-buttons-disabled-opacity)');
  });
  it('should handle onClick', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Expander onClick={onClick}></Expander>,
    );
    // ACT
    const expander = container.querySelector('.ds-expander') as HTMLElement;
    fireEvent.click(expander);
    // ASSERT
    expect(onClick).toBeCalledTimes(1);
  });
});
