import styled from 'styled-components';

import type { ThemeProps } from '@synerise/ds-core';

export const DefaultFallback = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--ds-image-placeholder-fg);
  background-color: var(--ds-image-placeholder-bg);
`;
