import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core/testing';
import BroadcastBar from '../BroadcastBar';

describe('BroadcastBar component', () => {
  it('should render with description', () => {
    const description = 'Description';
    renderWithProvider(<BroadcastBar type="success" description={description} />);

    expect(screen.getByText(description)).toBeTruthy();
  });

  it('renders the button wrapper without its own background or radius', () => {
    renderWithProvider(
      <BroadcastBar
        type="success"
        description="Description"
        button={<button type="button">Act</button>}
      />,
    );
    const css = Array.from(document.querySelectorAll('style'))
      .map((style) => style.textContent ?? '')
      .join('')
      .replace(/\s/g, '');

    expect(css).not.toContain('rgba(255,255,255,0.2)');
  });
});
