import React from 'react';
import { renderWithProvider } from '@synerise/ds-core/testing';

import Badge, { BadgeWithLabel } from '../index';

const TEST_ID = 'badge';
const COUNT = 3;
const OVERFLOW_COUNT = 99;
const LOW_OVERFLOW_COUNT = 2;
const NO_FILL = 'rgba(0, 0, 0, 0)';

describe('Badge', () => {
  it('should render a standalone count badge', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Badge count={COUNT} data-testid={TEST_ID} />);
    const sup = container.querySelector('sup');

    // ASSERT
    expect(sup).toHaveClass('ds-badge-count');
    expect(sup).toHaveAttribute('title', `${COUNT}`);
    expect(sup?.querySelector('.current')).toHaveTextContent(`${COUNT}`);
  });

  it('should forward data-* attributes to the outermost wrapper', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(<Badge status="active" data-testid={TEST_ID} />);

    // ASSERT
    expect(getByTestId(TEST_ID)).toHaveClass('ds-badge');
  });

  it('should render a dot badge', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Badge dot data-testid={TEST_ID} />);

    // ASSERT
    expect(container.querySelector('sup')).toHaveClass('ds-badge-dot');
  });

  it('should cap the count at overflowCount', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Badge count={COUNT} overflowCount={LOW_OVERFLOW_COUNT} />
    );

    // ASSERT
    expect(container.querySelector('sup')).toHaveTextContent(`${LOW_OVERFLOW_COUNT}+`);
  });

  it('should render the exact count when below overflowCount', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Badge count={COUNT} overflowCount={OVERFLOW_COUNT} />);

    // ASSERT
    expect(container.querySelector('.current')).toHaveTextContent(`${COUNT}`);
  });

  it('should apply the matching status class to the dot', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Badge status="blocked" />);
    const dot = container.querySelector('.ds-badge-dot');

    // ASSERT — the ds-badge-* class hooks are present
    expect(dot).toHaveClass('ds-badge-dot');
    expect(dot).toHaveClass('ds-badge-status-dot');
    expect(dot).toHaveClass('ds-badge-status-blocked');
  });

  it('should render the count badge with an outline', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Badge count={4} offset={[0, 0]} outlined overflowCount={OVERFLOW_COUNT} />
    );

    // ASSERT
    const count = container.querySelector('.ds-badge-count') as Element;
    expect(window.getComputedStyle(count).boxShadow).toMatch(
      /^0 0 0 1px var\(--ds-[\w-]+\)$/
    );
  });

  it('should render the count badge without an outline by default', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Badge count={4} offset={[0, 0]} overflowCount={OVERFLOW_COUNT} />
    );

    // ASSERT
    expect(container.querySelector('.ds-badge-count')).toHaveStyle(
      'box-shadow: none'
    );
  });

  it('should render the solid-ring variant like the deprecated outlined prop', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <>
        <Badge count={COUNT} variant="solid-ring" />
        <Badge count={COUNT} outlined />
      </>
    );
    const [ring, outlined] = Array.from(
      container.querySelectorAll('.ds-badge-count')
    );

    // ASSERT
    expect(window.getComputedStyle(ring).boxShadow).toBe(
      window.getComputedStyle(outlined).boxShadow
    );
    expect(window.getComputedStyle(ring).boxShadow).toMatch(
      /^0 0 0 1px var\(--ds-[\w-]+\)$/
    );
  });

  describe('outline variant', () => {
    const getCount = (container: HTMLElement) =>
      container.querySelector('.ds-badge-count') as Element;

    it.each([
      ['active', 'success'],
      ['inactive', 'neutral'],
      ['blocked', 'error'],
      ['processing', 'info'],
      ['warning', 'warning'],
    ] as const)(
      'should draw a %s count with the %s border and text tokens and no fill',
      (status, tokenVariant) => {
        // ARRANGE
        const { container } = renderWithProvider(
          <Badge count={COUNT} status={status} variant="outline" />
        );
        const style = window.getComputedStyle(getCount(container));

        // ASSERT
        expect(style.backgroundColor).toBe(NO_FILL);
        expect(style.color).toBe(`var(--ds-badge-variant-${tokenVariant}-text)`);
        expect(style.boxShadow).toBe(
          `inset 0 0 0 1px var(--ds-badge-variant-${tokenVariant}-border)`
        );
      }
    );

    it('should fall back to the error tokens without a status', () => {
      // ARRANGE
      const { container } = renderWithProvider(
        <Badge count={COUNT} variant="outline" />
      );
      const style = window.getComputedStyle(getCount(container));

      // ASSERT
      expect(style.color).toBe('var(--ds-badge-variant-error-text)');
      expect(style.boxShadow).toBe(
        'inset 0 0 0 1px var(--ds-badge-variant-error-border)'
      );
    });

    it('should draw the border and text in a raw customColor', () => {
      // ARRANGE
      const { container } = renderWithProvider(
        <Badge count={COUNT} status="active" customColor="#ff0000" variant="outline" />
      );
      const count = getCount(container);

      // ASSERT
      expect(count).toHaveStyle('color: #ff0000');
      expect(count).toHaveStyle(`background-color: ${NO_FILL}`);
      expect(window.getComputedStyle(count).boxShadow).toBe('inset 0 0 0 1px #ff0000');
    });

    it('should resolve a palette customColor for the border and text', () => {
      // ARRANGE
      const { container } = renderWithProvider(
        <Badge count={COUNT} customColor="blue" variant="outline" />
      );
      const style = window.getComputedStyle(getCount(container));

      // ASSERT
      expect(style.color).toBe('var(--ds-color-custom-blue-600)');
      expect(style.boxShadow).toBe('inset 0 0 0 1px var(--ds-color-custom-blue-600)');
    });

    it('should take precedence over the deprecated outlined prop', () => {
      // ARRANGE
      const { container } = renderWithProvider(
        <Badge count={COUNT} variant="outline" outlined />
      );

      // ASSERT
      expect(window.getComputedStyle(getCount(container)).boxShadow).toMatch(/^inset /);
    });
  });

  it('should hide the count when it is zero', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Badge count={0} />);

    // ASSERT
    expect(container.querySelector('sup')).toBeNull();
  });

  it('should render a count (not a dot) when count and status are both set', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Badge status="blocked" count={3} />);

    // ASSERT — count wins over status-dot mode; status colours the count
    expect(container.querySelector('.ds-badge-count')).toBeTruthy();
    expect(container.querySelector('.ds-badge-dot')).toBeNull();
    expect(container.querySelector('.current')).toHaveTextContent('3');
  });

  it('should render a custom-node count without the count-pill background', () => {
    // ARRANGE
    const { container, getByText } = renderWithProvider(
      <Badge count={<span>icon</span>} />
    );

    // ASSERT — no `.ds-badge-count` pill; rendered as a bare custom component
    expect(container.querySelector('.ds-badge-count')).toBeNull();
    expect(
      container.querySelector('.ds-badge-scroll-number-custom-component')
    ).toBeTruthy();
    expect(getByText('icon')).toBeTruthy();
  });

  it('should apply a raw hex customColor outside the palette', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Badge dot customColor="#ff0000" />);

    // ASSERT
    expect(container.querySelector('.ds-badge-dot')).toHaveStyle(
      'background-color: #ff0000'
    );
  });

  it('should render a status dot next to the label when `text` is set', () => {
    // ARRANGE — legacy `status` + `text` API delegates to BadgeWithLabel
    const { container, getByText } = renderWithProvider(
      <Badge status="active" text="Online" />
    );
    const dot = container.querySelector('.ds-badge-dot');

    // ASSERT
    expect(dot).toHaveClass('ds-badge-status-active');
    expect(getByText('Online')).toBeTruthy();
  });

  describe('BadgeWithLabel', () => {
    it('should render a status dot next to the label', () => {
      // ARRANGE
      const { container, getByText } = renderWithProvider(
        <BadgeWithLabel status="active">Online</BadgeWithLabel>
      );
      const dot = container.querySelector('.ds-badge-dot');

      // ASSERT
      expect(dot).toHaveClass('ds-badge-status-active');
      expect(getByText('Online')).toBeTruthy();
    });
  });
});
