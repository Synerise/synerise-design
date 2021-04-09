import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Button from '@synerise/ds-button';
import Footer from '.';

describe('Footer', () => {
  it('should have 1px grey-200 top border and 16px padding', () => {
    const { container } = renderWithProvider(<Footer />);
    const footer = container.firstChild as HTMLDivElement;
    const style = window.getComputedStyle(footer);
    expect(style.padding).toBe('16px 0px');
    expect(style.borderTop).toBe('1px solid #e9edee');
  });

  it('should pass style prop', () => {
    const { container } = renderWithProvider(<Footer style={{ transform: 'rotate(360deg)' }} />);
    const footer = container.firstChild as HTMLDivElement;
    const style = window.getComputedStyle(footer);
    expect(style.transform).toBe('rotate(360deg)');
  });

  it('should pass className prop', () => {
    const { container } = renderWithProvider(<Footer className="custom-footer" />);
    const footer = container.firstChild as HTMLDivElement;
    expect(footer.classList.contains('custom-footer')).toBeTruthy();
  });

  it('should render children', () => {
    const { getAllByRole } = renderWithProvider(
      <Footer>
        <Button />
        <Button />
        <Button />
      </Footer>
    );
    expect(getAllByRole('button')).toHaveLength(3);
  });
});
