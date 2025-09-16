import React from 'react';

import Button from '@synerise/ds-button';
import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import Footer from '.';

describe('Footer', () => {
  it('should have 1px grey-200 top border and 16px padding', () => {
    renderWithProvider(<Footer />);
    expect(screen.getByRole('contentinfo')).toHaveStyle(`
      padding: 16px 0;
      border-top: 1px solid #e9edee;
    `);
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
