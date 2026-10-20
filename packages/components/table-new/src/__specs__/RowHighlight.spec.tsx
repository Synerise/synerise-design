import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';

import { Table } from '../Table';
import { COLUMNS, DATA } from './data';

const getHighlightKeyframes = () => {
  const css = Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent ?? '')
    .join('\n');
  const start = css.indexOf('@keyframes ds-table-row-highlight');
  if (start === -1) {
    return null;
  }
  let depth = 0;
  for (let i = css.indexOf('{', start); i < css.length; i++) {
    if (css[i] === '{') {
      depth++;
    } else if (css[i] === '}' && --depth === 0) {
      return css.slice(start, i + 1);
    }
  }
  return null;
};

describe('row highlight keyframes', () => {
  it('never animates the cell background through a transparent colour', () => {
    renderWithProvider(<Table data={DATA} columns={COLUMNS} />);

    const keyframes = getHighlightKeyframes();

    expect(keyframes).not.toBeNull();
    expect(keyframes).not.toMatch(/transparent/);
    expect(keyframes).not.toMatch(/(^|[{}\s,])(0%|100%|from|to)\s*[{,]/);
    expect(keyframes).toMatch(/--ds-highlight-color/);
  });
});
