import { createGlobalStyle } from 'styled-components';

const FONT_FAMILY = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`;
const CODE_FONT_FAMILY = 'Consolas, Menlo, Courier, monospace';

// The element reset sits inside :where() so it has zero specificity: any component or app
// rule wins over it whatever order the stylesheets load in.
export const GlobalResetStyles = createGlobalStyle`
  :where(html, body) {
    width: 100%;
    height: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :where(html) {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: var(--ds-color-transparent);
  }

  :where(body) {
    margin: 0;
    color: var(--ds-color-text-base-muted);
    font-size: 13px;
    font-family: ${FONT_FAMILY};
    font-variant: tabular-nums;
    line-height: 1.38;
    background-color: var(--ds-color-background-base-muted);
    font-feature-settings: 'tnum';
  }

  :where([tabindex='-1']:focus) {
    outline: none !important;
  }

  :where(hr) {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  :where(h1, h2, h3, h4, h5, h6) {
    margin-top: 0;
    margin-bottom: 0.5em;
    color: var(--ds-color-text-base-default);
    font-weight: 500;
  }

  :where(p) {
    margin-top: 0;
    margin-bottom: 1em;
  }

  :where(abbr[title], abbr[data-original-title]) {
    text-decoration: underline;
    text-decoration: underline dotted;
    border-bottom: 0;
    cursor: help;
  }

  :where(address) {
    margin-bottom: 1em;
    font-style: normal;
    line-height: inherit;
  }

  :where(
      input[type='text'],
      input[type='password'],
      input[type='number'],
      textarea
    ) {
    -webkit-appearance: none;
  }

  :where(ol, ul, dl) {
    margin-top: 0;
    margin-bottom: 1em;
  }

  :where(ol ol, ul ul, ol ul, ul ol) {
    margin-bottom: 0;
  }

  :where(dt) {
    font-weight: 500;
  }

  :where(dd) {
    margin-bottom: 0.5em;
    margin-left: 0;
  }

  :where(blockquote) {
    margin: 0 0 1em;
  }

  :where(dfn) {
    font-style: italic;
  }

  :where(b, strong) {
    font-weight: bolder;
  }

  :where(small) {
    font-size: 80%;
  }

  :where(sub, sup) {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  :where(sub) {
    bottom: -0.25em;
  }

  :where(sup) {
    top: -0.5em;
  }

  :where(a) {
    color: var(--ds-color-text-brand-default);
    text-decoration: none;
    background-color: var(--ds-color-transparent);
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
    -webkit-text-decoration-skip: objects;
  }

  :where(a:hover) {
    color: var(--ds-color-text-brand-defaulthover);
  }

  :where(a:active) {
    color: var(--ds-color-text-brand-default);
  }

  :where(a:active, a:hover) {
    text-decoration: underline;
    outline: 0;
  }

  :where(a:focus) {
    text-decoration: none;
    outline: 0;
  }

  :where(a[disabled]) {
    color: var(--ds-color-text-base-disabled);
    cursor: not-allowed;
  }

  :where(pre, code, kbd, samp) {
    font-size: 1em;
    font-family: ${CODE_FONT_FAMILY};
  }

  :where(pre) {
    margin-top: 0;
    margin-bottom: 1em;
    overflow: auto;
  }

  :where(figure) {
    margin: 0 0 1em;
  }

  :where(img) {
    vertical-align: middle;
    border-style: none;
  }

  :where(
      a,
      area,
      button,
      [role='button'],
      input:not([type='range']),
      label,
      select,
      summary,
      textarea
    ) {
    touch-action: manipulation;
  }

  :where(table) {
    border-collapse: collapse;
  }

  :where(caption) {
    padding-top: 0.75em;
    padding-bottom: 0.3em;
    color: var(--ds-color-text-base-default);
    text-align: left;
    caption-side: bottom;
  }

  :where(input, button, select, optgroup, textarea) {
    margin: 0;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
  }

  :where(button, input) {
    overflow: visible;
  }

  :where(button, select) {
    text-transform: none;
  }

  :where(button, html [type='button'], [type='reset'], [type='submit']) {
    -webkit-appearance: button;
  }

  :where(button, [type='button'], [type='reset'], [type='submit'])::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  :where(input[type='radio'], input[type='checkbox']) {
    box-sizing: border-box;
    padding: 0;
  }

  :where(
      input[type='date'],
      input[type='time'],
      input[type='datetime-local'],
      input[type='month']
    ) {
    -webkit-appearance: listbox;
  }

  :where(textarea) {
    overflow: auto;
    resize: vertical;
  }

  :where(fieldset) {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  :where(legend) {
    display: block;
    width: 100%;
    max-width: 100%;
    margin-bottom: 0.5em;
    padding: 0;
    color: inherit;
    font-size: 1.5em;
    line-height: inherit;
    white-space: normal;
  }

  :where(progress) {
    vertical-align: baseline;
  }

  :where([type='number'])::-webkit-inner-spin-button,
  :where([type='number'])::-webkit-outer-spin-button {
    height: auto;
  }

  :where([type='search']) {
    outline-offset: -2px;
    -webkit-appearance: none;
  }

  :where([type='search'])::-webkit-search-cancel-button,
  :where([type='search'])::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    font: inherit;
    -webkit-appearance: button;
  }

  :where(output) {
    display: inline-block;
  }

  :where(summary) {
    display: list-item;
  }

  :where(template) {
    display: none;
  }

  :where([hidden]) {
    display: none !important;
  }

  :where(mark) {
    padding: 0.2em;
    background-color: var(--ds-color-background-warning-subtle);
  }

  ::selection {
    color: var(--ds-color-text-brand-onsolid);
    background: var(--ds-color-background-brand-solid);
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    outline: none !important;

    &::placeholder {
      font-size: inherit !important;
      font-weight: inherit !important;
    }
  }

  .snrs-body-portal {
    strong,
    b {
      font-weight: 500;
    }

    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      outline: none !important;

      &::placeholder {
        font-size: inherit !important;
        font-weight: inherit !important;
      }
    }
  }
`;
