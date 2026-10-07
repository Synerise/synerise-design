import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';

import { TextTrigger } from '../components/TextTrigger/TextTrigger';

// jsdom cannot resolve var(), so read the css styled-components injected into <style> tags.
const injectedCss = (): string =>
  Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent ?? '')
    .join('')
    .replace(/\s/g, '');

describe('TextTrigger inactive colour', () => {
  it('defaults to the custom grey-800 token', () => {
    renderWithProvider(<TextTrigger value="Trigger" />);

    expect(injectedCss()).toContain('color:var(--ds-color-custom-grey-800)');
  });

  it('resolves a family-shade string through the custom-colour tokens', () => {
    renderWithProvider(<TextTrigger value="Trigger" inactiveColor="blue-600" />);

    expect(injectedCss()).toContain('color:var(--ds-color-custom-blue-600)');
  });

  it('passes an already-resolved var() straight through', () => {
    renderWithProvider(
      <TextTrigger
        value="Trigger"
        inactiveColor="var(--ds-color-text-base-muted)"
      />,
    );

    expect(injectedCss()).toContain('color:var(--ds-color-text-base-muted)');
  });
});
