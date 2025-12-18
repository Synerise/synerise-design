import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  [data-popover-trigger] ~ span[aria-hidden],
  div[data-floating-ui-portal] {
    display: contents;
  }
`;
