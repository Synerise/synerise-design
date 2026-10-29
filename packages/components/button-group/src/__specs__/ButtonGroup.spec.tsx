import React from 'react';

import Button from '@synerise/ds-button';
import { renderWithProvider, rulesFor } from '@synerise/ds-core/testing';
import { fireEvent } from '@testing-library/react';

import ButtonGroup from '../';

describe('ButtonGroup', () => {
  const onClick = vi.fn();
  it('should render', function () {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <ButtonGroup>
        <Button onClick={onClick}>Button Text</Button>
      </ButtonGroup>,
    );

    // ASSERT
    expect(getByText('Button Text')).toBeTruthy();
  });

  it('should render with title and description', function () {
    // ARRANGE
    const TITLE = 'Title of ButtonGroup';
    const DESCRIPTION = 'Description of ButtonGroup';

    const { getByText } = renderWithProvider(
      <ButtonGroup title={TITLE} description={DESCRIPTION}>
        <Button onClick={onClick}>Button Text</Button>
      </ButtonGroup>,
    );

    // ASSERT
    expect(getByText(TITLE)).toBeTruthy();
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should button onClick be called', function () {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <ButtonGroup>
        <Button onClick={onClick}>Button Text</Button>
      </ButtonGroup>,
    );

    // ACT
    fireEvent.click(getByText('Button Text'));

    // ASSERT
    expect(onClick).toBeCalled();
  });

  /**
   * jsdom has no layout and does not evaluate `:has()`, so the rendered corner radii cannot be
   * asserted here — verified in Chromium instead. What *is* checkable is the shape of the emitted
   * selector, which is where the defect lived: `:has()` may not contain `:has()`, and because
   * `:is()` is forgiving the browser drops the offending branch without erroring. The rule then
   * only recognises bare sibling buttons, so a button wrapped in a trigger span goes unseen and the
   * button before it rounds all four corners as though it were the only one.
   */
  describe('compact corner selectors', () => {
    // Selectors of the rules this group emits for its buttons, so a rule left in the sheet by
    // another render cannot satisfy the assertion.
    const compactSelectors = () => {
      const { container, getByText } = renderWithProvider(
        <ButtonGroup compact>
          <Button>One</Button>
          <span>
            <Button>Two</Button>
          </span>
        </ButtonGroup>,
      );
      const group = container.querySelector('.ds-button-group');
      return ['One', 'Two'].flatMap((label) =>
        rulesFor(getByText(label).closest('.ant-btn'), {
          within: group,
          state: 'any',
        }).map(({ selector }) => selector),
      );
    };

    it('never nests :has() inside :has()', () => {
      const selectors = compactSelectors();
      const nested = selectors.join('\n').match(/:has\([^)]*:has\(/g) ?? [];

      expect(selectors.some((selector) => selector.includes(':has('))).toBe(true);
      expect(nested).toEqual([]);
    });

    it('still recognises a button wrapped in a span as following its sibling', () => {
      // The relative form that replaced the nested one. Without it the wrapped button is invisible
      // to the "is another unit after me?" test.
      expect(compactSelectors().join('\n')).toMatch(/:has\(~ \.ant-btn, ?~ span > \.ant-btn\)/);
    });
  });
});
