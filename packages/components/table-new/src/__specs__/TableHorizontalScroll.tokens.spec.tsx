import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { describe, expect, it } from 'vitest';

import {
  LeftShadow,
  RightShadow,
} from '../components/TableHorizontalScroll/TableHorizontalScroll.styles';

const getCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('\n');

describe('TableHorizontalScroll shadows', () => {
  it('use the scroll shadow token', () => {
    renderWithProvider(
      <>
        <LeftShadow offset={0} />
        <RightShadow offset={0} />
      </>,
    );
    const matches = getCss().match(/var\(--ds-table-scroll-shadow\)/g) ?? [];
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });
});
