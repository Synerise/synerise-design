import { createGlobalStyle } from 'styled-components';

import { cssText } from '@synerise/ds-tokens';

export const GlobalTokenStyles = createGlobalStyle`
  :root {
    ${cssText}
  }
`;
