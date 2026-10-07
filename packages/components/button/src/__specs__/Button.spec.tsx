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

  describe('variant tokens', () => {
    const injectedCss = (): string =>
      Array.from(document.querySelectorAll('style'))
        .map((style) => style.textContent ?? '')
        .join('')
        .replace(/\s/g, '');

    it.each(['primary', 'danger', 'success', 'warning'])(
      '%s disabled state uses the solid disabled tokens plus the disabled opacity',
      (type) => {
        renderWithProvider(
          <Button type={type as 'primary'} disabled>
            Click ME!
          </Button>,
        );
        const css = injectedCss();
        const prefix =
          type === 'primary'
            ? '--ds-buttons-variant-primary'
            : `--ds-buttons-variant-primary-${type}`;

        expect(css).toContain(`background:var(${prefix}-bg-disabled)`);
        expect(css).toContain(`color:var(${prefix}-text-disabled)`);
        expect(css).toContain('opacity:var(--ds-buttons-disabled-opacity)');
      },
    );

    it('danger hover, pressed, ripple and focus ring come from the danger tokens', () => {
      renderWithProvider(<Button type="danger">Click ME!</Button>);
      const css = injectedCss();

      [
        'var(--ds-buttons-variant-primary-danger-bg-hover)',
        'var(--ds-buttons-variant-primary-danger-bg-active)',
        'var(--ds-buttons-variant-primary-danger-text-hover)',
        'var(--ds-buttons-variant-primary-danger-text-active)',
        'inset0002pxvar(--ds-buttons-variant-primary-danger-border-focus)',
      ].forEach((token) => expect(css).toContain(token));
      expect(css).not.toContain('rgba(255,90,77');
    });

    it('success focus ring and ripple come from the success tokens', () => {
      renderWithProvider(<Button type="success">Click ME!</Button>);
      const css = injectedCss();

      expect(css).toContain(
        'inset0002pxvar(--ds-buttons-variant-primary-success-border-focus)',
      );
      expect(css).toContain(
        'background-color:var(--ds-buttons-variant-primary-success-bg-active)',
      );
    });
  });
});
