import { createGlobalStyle } from 'styled-components';

import { cssText as darkCssText } from '@synerise/ds-tokens/dark';
import { cssText as lightCssText } from '@synerise/ds-tokens/light';

// Both themes are always injected. Light lives on :root (the default); dark overrides it
// whenever data-ds-theme="dark" is set on <html>. Switching themes is therefore a single
// attribute flip — no CSS re-injection — and portaled overlays (dropdowns, modals and
// tooltips render to document.body) inherit the vars because they sit under <html>.
export const GlobalTokenStyles = createGlobalStyle`
  :root {
    ${lightCssText}
  }
  :root[data-ds-theme='dark'] {
    ${darkCssText}
  }
`;
