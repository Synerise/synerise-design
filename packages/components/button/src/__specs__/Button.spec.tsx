import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { fireEvent, screen } from '@testing-library/react';

import Button from '../index';

describe('Button', () => {
  const onClick = vi.fn();
  it('should render', function () {
    renderWithProvider(<Button onClick={onClick}>Click ME!</Button>);

    expect(screen.getByText('Click ME!')).toBeInTheDocument();
  });

  it('should onClick be called', function () {
    renderWithProvider(<Button onClick={onClick}>Click ME!</Button>);

    fireEvent.click(screen.getByText('Click ME!'));

    expect(onClick).toBeCalled();
  });

  it('should show spinner animation', () => {
    renderWithProvider(<Button loading>Click ME!</Button>);
    expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
  });

  it('should render with status tag', () => {
    const TAG_NAME = 'tag name';
    renderWithProvider(
      <Button tagProps={{ name: TAG_NAME }}>Click ME!</Button>,
    );
    expect(screen.getByText(TAG_NAME)).toBeInTheDocument();
  });

  it('should wire error state to buttons-error tokens', () => {
    renderWithProvider(<Button error>Click ME!</Button>);
    const css = Array.from(document.querySelectorAll('style'))
      .map((s) => s.textContent)
      .join('')
      .replace(/\s/g, '');
    [
      'background-color:var(--ds-buttons-error-bg-default)',
      'background-color:var(--ds-buttons-error-bg-hover)',
      'background-color:var(--ds-buttons-error-bg-pressed)',
      'var(--ds-buttons-error-border)',
      'color:var(--ds-buttons-error-text-default)',
      'color:var(--ds-buttons-error-text-pressed)',
    ].forEach((decl) => expect(css).toContain(decl));
  });
});
