import React from 'react';

import Button from '@synerise/ds-button';
import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import { screen } from '@testing-library/react';

import Footer from '.';

describe('Footer', () => {
  it('should have a 1px top border and 16px padding', () => {
    renderWithProvider(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveStyle('padding: 16px 0');
    // jsdom drops `var()` on the `border-top` shorthand, so read the declaration instead.
    expect(declarationsFor(footer)).toMatch(/(?:^|;)border-top:1px solid [^;]+/);
  });

  it('should pass style prop', () => {
    renderWithProvider(<Footer style={{ transform: 'rotate(360deg)' }} />);
    expect(screen.getByRole('contentinfo')).toHaveStyle(`
      transform: rotate(360deg);
    `);
  });

  it('should pass className prop', () => {
    renderWithProvider(<Footer className="custom-footer" />);
    expect(screen.getByRole('contentinfo')).toHaveClass('custom-footer');
  });

  it('should render children', () => {
    renderWithProvider(
      <Footer>
        <Button />
        <Button />
        <Button />
      </Footer>,
    );
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });
});
